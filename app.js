let data = window.HOMISP_DASHBOARD_DATA;
let refreshTimer = null;
let refreshInFlight = false;
let lastOpenedSector = null;
const detailRequestCache = new Map();
let publicJourneyLists = null;
let publicJourneyListsPromise = null;
let currentDayReportData = null;

const refreshIntervalMs = 30000;
const isDevMode = new URLSearchParams(window.location.search).get("dev") === "1";
const initialParams = new URLSearchParams(window.location.search);
const publicApiUrl =
  typeof window.HOMISP_PUBLIC_API_URL === "string" ? window.HOMISP_PUBLIC_API_URL.trim() : "";
const publicApiMode =
  typeof window.HOMISP_PUBLIC_API_MODE === "string" ? window.HOMISP_PUBLIC_API_MODE.trim().toLowerCase() : "";

const palette = [
  "#0f8a83",
  "#2166d1",
  "#d97706",
  "#7c3aed",
  "#1a8f45",
  "#c93333",
  "#c6a014",
  "#197278",
];

const priorityColors = {
  prioridade_10: "#d71920",
  prioridade_60: "#d8b100",
  prioridade_120: "#149447",
  prioridade_240: "#2563eb",
};

const outcomeColors = {
  alta_hospitalar: "#149447",
  transferencia: "#d97706",
  obito: "#64748b",
};

const sectorLabels = {
  alta_hospitalar: "Alta hospitalar",
  consultorio_adulto_1: "Consultório adulto 1",
  consultorio_adulto_2: "Consultório adulto 2",
  consultorio_adulto_3: "Consultório adulto 3",
  consultorio_pediatrico_1: "Consultório pediátrico 1",
  consultorio_pediatrico_2: "Consultório pediátrico 2",
  consultorio_pediatrico_3: "Consultório pediátrico 3",
  internacao: "Internação",
  recepcao_adulto: "Aguardando triagem adulto",
  recepcao_infantil: "Aguardando triagem infantil",
  enfermagem: "Enfermagem",
  sala_repouso: "Enfermagem",
  sala_de_repouso: "Enfermagem",
  sala_medicacao: "Enfermagem",
  sala_de_medicacao: "Enfermagem",
  transferencia: "Transferência",
  triagem_adulto: "Triagem adulto",
  triagem_infantil: "Triagem infantil",
  obito: "Óbito",
};

const hiddenDashboardSteps = new Set([
  "consultorio_adulto_4",
  "recepcao_infantil",
  "triagem_infantil",
  "consultorio_pediatrico_1",
  "consultorio_pediatrico_2",
  "consultorio_pediatrico_3",
]);

function qs(selector) {
  return document.querySelector(selector);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function formatDecimal(value, digits = 1) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Number(value) || 0);
}

function activeDateFilters() {
  return {
    dateFrom: qs("#dateFrom")?.value || "",
    dateTo: qs("#dateTo")?.value || "",
  };
}

function dashboardQueryParams(extra = {}) {
  const filters = activeDateFilters();
  const params = new URLSearchParams({ ts: String(Date.now()), ...extra });
  if (filters.dateFrom) params.set("date_from", filters.dateFrom);
  if (filters.dateTo) params.set("date_to", filters.dateTo);
  return params;
}

function dashboardRequestUrl(extra = {}) {
  const params = dashboardQueryParams(extra);
  if (!publicApiUrl) return `/api/dashboard-data?${params}`;

  const url = new URL(publicApiUrl, window.location.href);
  params.forEach((value, key) => url.searchParams.set(key, value));
  return url.toString();
}

function shouldUseJsonp() {
  if (!publicApiUrl) return false;
  return publicApiMode === "jsonp";
}

function shouldUseIframeTransport() {
  if (!publicApiUrl) return false;
  return publicApiMode === "iframe";
}

function loadIframeTransport(url) {
  const requestId = `homisp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const requestUrl = new URL(url, window.location.href);
  requestUrl.searchParams.set("callback", "homispIframeCallback");

  return new Promise((resolve, reject) => {
    const frame = document.createElement("iframe");
    frame.style.cssText = "position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;border:0;opacity:0;pointer-events:none";
    frame.title = "Atualização de dados do dashboard";
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Tempo limite ao carregar dados externos"));
    }, 20000);

    function cleanup() {
      window.clearTimeout(timeout);
      window.removeEventListener("message", receive);
      frame.remove();
    }

    function receive(event) {
      const message = event.data;
      if (!message || message.type !== "homisp-dashboard-data" || message.requestId !== requestId) return;
      cleanup();
      if (message.error) reject(new Error(message.error));
      else resolve(message.payload);
    }

    window.addEventListener("message", receive);
    const scriptUrl = requestUrl.toString().replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    frame.srcdoc = `<!doctype html><meta charset="utf-8"><script>window.homispIframeCallback=function(payload){top.postMessage({type:"homisp-dashboard-data",requestId:${JSON.stringify(requestId)},payload:payload},"*")};<\/script><script src="${scriptUrl}"><\/script>`;
    document.body.append(frame);
  });
}

function loadJsonp(url) {
  const callbackName = `homispDashboardCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const requestUrl = new URL(url, window.location.href);
  requestUrl.searchParams.set("callback", callbackName);

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Tempo limite ao carregar dados externos"));
    }, 60000);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (payload) => {
      cleanup();
      resolve(payload);
    };

    script.src = requestUrl.toString();
    script.async = true;
    script.onerror = () => {
      cleanup();
      reject(new Error("Falha ao carregar dados externos"));
    };
    document.head.append(script);
  });
}

async function requestDashboardDataWithRetry(maxAttempts = 2) {
  let lastError = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await requestDashboardData();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await new Promise((resolve) => window.setTimeout(resolve, 1200));
      }
    }
  }
  throw lastError || new Error("Falha ao atualizar o dashboard");
}

async function requestDashboardData(extra = {}) {
  const url = dashboardRequestUrl(extra);
  return requestDashboardDataFromUrl(url);
}

async function requestDashboardDataFromUrl(url) {
  if (shouldUseIframeTransport()) {
    try {
      return await loadIframeTransport(url);
    } catch (error) {
      return loadJsonp(url);
    }
  }
  if (shouldUseJsonp()) {
    return loadJsonp(url);
  }

  try {
    const response = await fetch(url, { cache: "no-store", redirect: "follow" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  } catch (error) {
    if (publicApiMode === "cors") throw error;
    return loadJsonp(url);
  }
}

function dashboardRequestUrlForPeriod(dateFrom, dateTo) {
  const params = new URLSearchParams({
    ts: String(Date.now()),
    date_from: dateFrom,
    date_to: dateTo,
  });
  if (!publicApiUrl) return `/api/dashboard-data?${params}`;

  const url = new URL(publicApiUrl, window.location.href);
  params.forEach((value, key) => url.searchParams.set(key, value));
  return url.toString();
}

function updateFilterUrl() {
  const filters = activeDateFilters();
  const params = new URLSearchParams(window.location.search);
  if (filters.dateFrom) params.set("date_from", filters.dateFrom);
  else params.delete("date_from");
  if (filters.dateTo) params.set("date_to", filters.dateTo);
  else params.delete("date_to");
  const query = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
}

function displayLabel(item) {
  return sectorLabels[item.id] || item.label || "Sem valor";
}

function renderKpis() {
  const isFiltered = Boolean(data.meta?.isFiltered);
  const isSingleDay = Boolean(data.meta?.isSingleDay);
  const kpis = [
    ["Sem CPF", data.kpis.pacientesSemCpf || 0, "CPF técnico", "#7c3aed"],
    ["Pacientes", data.kpis.totalPacientes, "CPFs únicos", "#2166d1"],
    ["Atuais", data.kpis.pacientesAtuais, isSingleDay ? "No dia" : "Em atendimento", "#0f8a83"],
    ["Gargalo atual", data.kpis.gargaloAtualLabel || "Sem gargalo", data.kpis.gargaloAtualTempoLabel || "0 min", "#8b5cf6"],
    ["Permanência", data.kpis.permanenciaMediaLabel, "Média até saída", "#1a8f45"],
    ["Reingresso", data.kpis.taxaReingressoLabel, "Retorno em 30 dias", "#c93333"],
  ];

  const grid = qs("#kpiGrid");
  grid.innerHTML = "";
  for (const [title, value, caption, color] of kpis) {
    const card = el("article", "kpi-card");
    card.style.setProperty("--accent", color);
    card.append(el("span", "", title));
    card.append(el("strong", "", String(value)));
    card.append(el("span", "", caption));
    grid.append(card);
  }
}

function renderBars(containerId, items, options = {}) {
  const container = qs(`#${containerId}`);
  container.innerHTML = "";
  const max = Math.max(...items.map((item) => Number(item.value) || 0), 1);
  items.forEach((item, index) => {
    const row = el("div", "bar-row");
    const label = el("div", "bar-label", displayLabel(item));
    const track = el("div", "bar-track");
    const fill = el("div", "bar-fill");
    const pct = Math.max(2, ((Number(item.value) || 0) / max) * 100);
    fill.style.width = `${pct}%`;
    fill.style.setProperty("--bar-color", item.color || palette[index % palette.length]);
    track.append(fill);
    const valueText = options.format ? options.format(item.value, item) : formatNumber(item.value);
    const value = el("div", "bar-value", valueText);
    row.append(label, track, value);
    container.append(row);
  });
}

function renderLeadRanking() {
  const container = qs("#leadByStepChart");
  container.innerHTML = "";
  const items = [...(data.charts.leadByStep || [])]
    .filter((item) => !hiddenDashboardSteps.has(item.id))
    .sort((a, b) => (Number(b.value) || 0) - (Number(a.value) || 0));

  if (!items.length) {
    container.append(el("div", "empty-state", "Sem tempo médio calculado para o período."));
    return;
  }

  const table = el("div", "lead-table");
  const header = el("div", "lead-table-row lead-table-head");
  header.append(el("span", "", "Etapa"), el("span", "", "Tempo médio"), el("span", "", "Atuais"));
  table.append(header);

  items.forEach((item) => {
    const row = el("div", "lead-table-row");
    const formattedValue = Number(item.value || 0).toLocaleString("pt-BR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    row.append(
      el("strong", "lead-table-stage", displayLabel(item)),
      el("span", "lead-table-value", `${formattedValue} min`),
      el("span", "lead-table-current", formatNumber(item.current || 0)),
    );
    table.append(row);
  });

  container.append(table);
}

function renderDonut(containerId, items) {
  const container = qs(`#${containerId}`);
  container.innerHTML = "";
  const total = items.reduce((sum, item) => sum + Number(item.value || 0), 0);
  let current = 0;
  const segments = items
    .map((item, index) => {
      const start = current;
      const end = current + (Number(item.value || 0) / Math.max(total, 1)) * 100;
      current = end;
      return `${palette[index % palette.length]} ${start}% ${end}%`;
    })
    .join(", ");

  const donut = el("div", "donut");
  donut.style.setProperty("--segments", segments || "#d8e1ea 0 100%");
  donut.dataset.total = formatNumber(total);

  const legend = el("div", "legend");
  items.forEach((item, index) => {
    const row = el("div", "legend-item");
    const left = document.createElement("label");
    const dot = document.createElement("i");
    dot.style.setProperty("--dot", palette[index % palette.length]);
    left.append(dot, document.createTextNode(item.label || "Sem valor"));
    row.append(left, el("strong", "", formatNumber(item.value)));
    legend.append(row);
  });

  container.append(donut, legend);
}

function entriesDailyAverage() {
  const points = data.charts.entries || [];
  if (!points.length) return 0;
  if (typeof data.kpis.mediaPacientesDia === "number") {
    return data.kpis.mediaPacientesDia;
  }
  const total = points.reduce((sum, point) => sum + (Number(point.value) || 0), 0);
  return total / points.length;
}

function renderDailyAverage() {
  const label = qs("#dailyAverageLabel");
  const caption = qs("#dailyAverageCaption");
  if (!label || !caption) return;
  const days = Number(data.kpis.diasComEntrada) || (data.charts.entries || []).length;
  label.textContent = formatDecimal(entriesDailyAverage());
  caption.textContent = days === 1 ? "Em 1 dia exibido" : `Em ${formatNumber(days)} dias exibidos`;
}

function renderLineChart() {
  const container = qs("#entriesChart");
  const points = data.charts.entries;
  if (!points.length) {
    container.innerHTML = '<p class="muted">Sem entradas para exibir.</p>';
    return;
  }
  const width = 760;
  const height = 230;
  const pad = 34;
  const max = Math.max(...points.map((p) => p.value), 1);
  const average = entriesDailyAverage();
  const averageY = height - pad - (average / max) * (height - pad * 2);
  const step = points.length > 1 ? (width - pad * 2) / (points.length - 1) : 0;
  const coords = points.map((p, i) => {
    const x = pad + i * step;
    const y = height - pad - (p.value / max) * (height - pad * 2);
    return { ...p, x, y };
  });
  const polyline = coords.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${pad},${height - pad} ${polyline} ${width - pad},${height - pad}`;
  const first = points[0]?.date || "";
  const last = points[points.length - 1]?.date || "";

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Entradas por data">
      <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="#d8e1ea" />
      <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" stroke="#d8e1ea" />
      <polygon points="${area}" fill="rgba(15,138,131,.12)"></polygon>
      <line class="average-line" x1="${pad}" y1="${averageY}" x2="${width - pad}" y2="${averageY}"></line>
      <text x="${width - pad}" y="${Math.max(pad + 12, averageY - 8)}" text-anchor="end" class="average-label">média ${formatDecimal(average)}</text>
      <polyline points="${polyline}" fill="none" stroke="#0f8a83" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${coords
        .map((p) => `<circle cx="${p.x}" cy="${p.y}" r="4.5" fill="#ffffff" stroke="#0f8a83" stroke-width="3"><title>${p.date}: ${p.value}</title></circle>`)
        .join("")}
      <text x="${pad}" y="${height - 8}" class="axis-label">${first}</text>
      <text x="${width - pad}" y="${height - 8}" text-anchor="end" class="axis-label">${last}</text>
      <text x="${pad + 4}" y="${pad - 10}" class="axis-label">${max}</text>
    </svg>
  `;
}

function renderGravity() {
  const grid = qs("#gravityGrid");
  grid.innerHTML = "";
  const items = data.charts.gravity || [];
  const periodMode = usePeriodTriageTotals();
  const patientCount = (item) => Number(periodMode ? item.totalClassified : item.patients) || 0;
  const total = items.reduce((sum, item) => sum + patientCount(item), 0);
  items.forEach((item) => {
    const patients = patientCount(item);
    const share = total ? (patients / total) * 100 : 0;
    const card = el("div", "gravity-card");
    const main = el("div", "gravity-card-main");
    card.style.setProperty("--gravity-color", priorityColors[item.id] || "#64748b");
    card.setAttribute("aria-label", `${item.label}: ${formatNumber(patients)} pacientes, ${formatDecimal(share)}% do total`);
    card.append(el("span", "", `${item.label} ${item.targetLabel || ""}`.trim()));
    main.append(el("strong", "", formatNumber(patients)));
    main.append(el("em", "gravity-share", `${formatDecimal(share)}%`));
    card.append(main);
    card.append(el("small", "", `${item.avgLeadLabel} ${periodMode ? "médio no período" : "médio geral"}`));
    grid.append(card);
  });
}

function usePeriodTriageTotals() {
  const filters = data.meta?.filters || {};
  const dateFrom = String(filters.dateFrom || "");
  const dateTo = String(filters.dateTo || "");
  if (!dateFrom && !dateTo) return false;

  const today = new Date();
  const todayIso = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
  return !(dateFrom === todayIso && dateTo === todayIso);
}

function renderSectors() {
  const grid = qs("#sectorTreemap");
  grid.innerHTML = "";
  data.sectors.filter((sector) => !sector.isFinal && !hiddenDashboardSteps.has(sector.id)).forEach((sector) => {
    const card = el("article", "sector-card");
    if (sector.current > 0) card.classList.add("is-active-sector");

    const top = el("div", "sector-top");
    top.append(el("h3", "", displayLabel(sector)), el("span", "", "Setor"));
    card.append(top);
    card.append(el("strong", "", formatNumber(sector.current)));
    card.append(el("small", "", `${sector.avgLeadMinutes} min médio`));
    if (canShowPatientDetails() && sector.current > 0) {
      card.classList.add("is-clickable");
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      const itemLabel = publicApiUrl ? "jornadas" : "pacientes";
      card.setAttribute("aria-label", `Ver ${formatNumber(sector.current)} ${itemLabel} em ${displayLabel(sector)}`);
      card.addEventListener("click", () => openSectorPatients(sector));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openSectorPatients(sector);
        }
      });
    }
    grid.append(card);
  });
}

function canShowPatientDetails() {
  return ["http:", "https:"].includes(window.location.protocol);
}

function localDetailUrl(path, params = {}) {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

async function fetchLocalDetail(path, params) {
  const response = await fetch(localDetailUrl(path, params), {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.ok === false) {
    throw new Error(payload.error || "Não foi possível carregar os dados.");
  }
  return payload;
}

async function fetchDetail(path, params = {}) {
  if (!publicApiUrl) return fetchLocalDetail(path, params);

  const url = dashboardRequestUrl(params);
  const cacheKey = url.replace(/([?&])ts=\d+&?/, "$1").replace(/[?&]$/, "");
  if (detailRequestCache.has(cacheKey)) return detailRequestCache.get(cacheKey);
  const request = (shouldUseIframeTransport()
    ? await loadIframeTransport(url).catch(() => loadJsonp(url))
    : shouldUseJsonp()
      ? await loadJsonp(url)
      : await fetch(url, { cache: "no-store", headers: { Accept: "application/json" } }).then((response) => {
        if (!response.ok) throw new Error("Não foi possível carregar os dados.");
        return response.json();
      }));
  const payload = await request;
  if (payload?.ok === false) throw new Error(payload.error || "Não foi possível carregar os dados.");
  if (detailRequestCache.size > 100) detailRequestCache.clear();
  detailRequestCache.set(cacheKey, payload);
  return payload;
}

function prefetchPublicJourneyLists() {
  if (!publicApiUrl || publicJourneyLists || publicJourneyListsPromise) return publicJourneyListsPromise;
  const filters = activeDateFilters();
  publicJourneyListsPromise = fetchDetail("/api/sector-patients", {
    view: "sector_journeys",
    sector: "__all__",
    date_from: filters.dateFrom,
    date_to: filters.dateTo,
  }).then((payload) => {
    publicJourneyLists = payload.groups || {};
    return publicJourneyLists;
  }).catch(() => null).finally(() => {
    publicJourneyListsPromise = null;
  });
  return publicJourneyListsPromise;
}

function resetPublicJourneyLists() {
  publicJourneyLists = null;
  publicJourneyListsPromise = null;
  detailRequestCache.clear();
}

function recordTimestamp(item) {
  const numeric = Number(item?.lastRecordedTimestamp);
  if (Number.isFinite(numeric) && numeric > 0) return numeric;
  const match = String(item?.lastRecordedAt || "").match(
    /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})/,
  );
  if (!match) return 0;
  const [, day, month, year, hour, minute] = match;
  return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)).getTime();
}

async function openSectorPatients(sector) {
  const dialog = qs("#sectorPatientsDialog");
  const list = qs("#sectorPatientsList");
  const feedback = qs("#sectorPatientsFeedback");
  lastOpenedSector = sector;
  const publicMode = Boolean(publicApiUrl);
  qs("#sectorDialogEyebrow").textContent = publicMode ? "Jornadas no setor" : "Pacientes no setor";
  qs("#sectorPatientsTitle").textContent = displayLabel(sector);
  const count = sector.current ?? sector.patients ?? 0;
  qs("#sectorPatientsSummary").textContent = `${formatNumber(count)} ${
    sector.isOutcome ? (count === 1 ? "jornada encerrada" : "jornadas encerradas") : publicMode ? (count === 1 ? "jornada atual" : "jornadas atuais") : (count === 1 ? "paciente atual" : "pacientes atuais")
  }`;
  list.innerHTML = "";
  feedback.textContent = publicMode ? "Carregando jornadas..." : "Carregando pacientes...";
  if (!dialog.open) dialog.showModal();

  const filters = activeDateFilters();
  try {
    if (publicMode && !publicJourneyLists) await prefetchPublicJourneyLists();
    const payload = publicMode && publicJourneyLists
      ? { ok: true, journeys: publicJourneyLists[sector.id] || [], total: (publicJourneyLists[sector.id] || []).length }
      : await fetchDetail("/api/sector-patients", {
          view: publicMode ? "sector_journeys" : "",
          sector: sector.id,
          date_from: filters.dateFrom,
          date_to: filters.dateTo,
        });
    qs("#sectorPatientsSummary").textContent = `${formatNumber(payload.total)} ${
      publicMode ? (payload.total === 1 ? "jornada encontrada" : "jornadas encontradas") : (payload.total === 1 ? "paciente encontrado" : "pacientes encontrados")
    }`;
    feedback.textContent = payload.total ? "" : publicMode ? "Nenhuma jornada encontrada neste setor." : "Nenhum paciente encontrado neste setor.";
    const items = [...(publicMode ? payload.journeys || [] : payload.patients || [])]
      .sort((a, b) => recordTimestamp(b) - recordTimestamp(a));
    items.forEach((patient) => {
      const button = el("button", "patient-list-item");
      button.type = "button";
      const identity = el("span", "patient-list-identity");
      identity.append(el("strong", "", publicMode ? `Jornada ${patient.id}` : patient.name));
      if (!publicMode) identity.append(el("small", "", patient.cpf));
      const recordLabel = publicMode ? "Último registro" : "Registro no setor";
      const recordMeta = el("span", "patient-list-meta");
      recordMeta.append(
        el("small", "patient-list-record-time", `${recordLabel}: ${patient.lastRecordedAt || "Não informado"}`),
        el("span", "patient-list-arrow", "›"),
      );
      button.append(identity, recordMeta);
      button.addEventListener("click", () => openPatientDetail(patient.id));
      list.append(button);
    });
  } catch (error) {
    feedback.textContent = error.message || "Não foi possível carregar os pacientes.";
  }
}

async function openPatientDetail(patientId) {
  const sectorDialog = qs("#sectorPatientsDialog");
  const dialog = qs("#patientDetailDialog");
  const facts = qs("#patientFacts");
  const journey = qs("#patientJourneyList");
  const feedback = qs("#patientDetailFeedback");
  const publicMode = Boolean(publicApiUrl);
  sectorDialog.close();
  qs("#patientDialogEyebrow").textContent = publicMode ? "Detalhes da jornada" : "Jornada do paciente";
  qs("#patientDetailTitle").textContent = publicMode ? "Jornada" : "Paciente";
  facts.innerHTML = "";
  journey.innerHTML = "";
  feedback.textContent = "Carregando jornada...";
  if (!dialog.open) dialog.showModal();

  try {
    const filters = activeDateFilters();
    const payload = await fetchDetail("/api/patient-detail", {
      view: publicMode ? "journey_detail" : "",
      id: patientId,
      date_from: filters.dateFrom,
      date_to: filters.dateTo,
    });
    const patient = publicMode ? payload.journey : payload.patient;
    qs("#patientDetailTitle").textContent = publicMode ? `Jornada ${patient.id}` : patient.name;
    const fields = publicMode
      ? [
          ["Identificador", patient.id],
          ["Spot atual", patient.currentSpot],
          ["Primeiro registro", patient.entryAt],
          ["Tempo de jornada", patient.journeyDuration],
          ...(patient.riskClassification ? [["Classificação de risco", patient.riskClassification, patient.riskClassificationId]] : []),
        ]
      : [
          ["CPF", patient.cpf],
          ["Data de nascimento", patient.birthDate],
          ["Sexo", patient.sex],
          ["Cidade", patient.city],
          ["Entrada", patient.entryDate],
          ["Tempo de jornada", patient.journeyDuration],
          ...(patient.riskClassification ? [["Classificação de risco", patient.riskClassification, patient.riskClassificationId]] : []),
          ["Spot atual", patient.currentSpot],
          ["Nº do boletim", patient.id],
        ];
    fields.forEach(([label, value, priorityId]) => {
      const wrapper = el("div", "patient-fact");
      if (priorityId) wrapper.classList.add("is-risk", priorityId);
      wrapper.append(el("dt", "", label), el("dd", "", value || "Não informado"));
      facts.append(wrapper);
    });
    const rawRecords = publicMode ? payload.records || [] : payload.journey || [];
    const seenRecords = new Set();
    const records = rawRecords.filter((record) => {
      const key = `${record.spot || ""}|${record.recordedAt || ""}`;
      if (seenRecords.has(key)) return false;
      seenRecords.add(key);
      return true;
    });
    records.forEach((record) => {
      const item = el("li", "journey-item");
      item.append(el("span", "journey-dot"), el("strong", "", record.spot), el("time", "", record.recordedAt));
      journey.append(item);
    });
    feedback.textContent = records.length ? "" : "Nenhum registro de jornada encontrado.";
  } catch (error) {
    feedback.textContent = error.message || "Não foi possível carregar o paciente.";
  }
}

function setupDetailDialogs() {
  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => qs(`#${button.dataset.closeDialog}`)?.close());
  });
  document.querySelectorAll(".detail-dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
  qs("#patientDetailBack")?.addEventListener("click", () => {
    qs("#patientDetailDialog")?.close();
    if (lastOpenedSector && !qs("#sectorPatientsDialog")?.open) qs("#sectorPatientsDialog")?.showModal();
  });
}

function renderOutcomes() {
  const grid = qs("#outcomeGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const outcomes = data.charts.outcomes || [];
  outcomes.forEach((item) => {
    const card = el("div", "outcome-card");
    card.style.setProperty("--outcome-color", outcomeColors[item.id] || "#64748b");
    card.append(el("span", "", item.label));
    card.append(el("strong", "", formatNumber(item.patients)));
    card.append(el("small", "", item.patients === 1 ? "ocorrência registrada" : "ocorrências registradas"));
    if (canShowPatientDetails() && item.patients > 0) {
      const outcome = { ...item, current: item.patients, isOutcome: true };
      card.classList.add("is-clickable");
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Ver ${formatNumber(item.patients)} jornadas em ${item.label}`);
      card.addEventListener("click", () => openSectorPatients(outcome));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openSectorPatients(outcome);
        }
      });
    }
    grid.append(card);
  });
}

function renderRegistrationEfficiency() {
  const efficiency = data.charts.registrationEfficiency;
  const bars = qs("#registrationEfficiencyBars");
  if (!efficiency || !bars) return;

  const total = Number(efficiency.totalEntries) || 0;
  const rate = (value, denominator = total) => (denominator ? (Number(value) || 0) / denominator : 0);
  const percent = (value) => `${formatDecimal(value * 100, 1)}%`;
  bars.innerHTML = "";
  (efficiency.stages || []).forEach((stage) => {
    const coverage = rate(stage.patients);
    const row = el("div", "efficiency-row");
    const heading = el("div", "efficiency-row-heading");
    heading.append(
      el("strong", "", stage.label),
      el("span", "", `${formatNumber(stage.patients)} de ${formatNumber(total)} · ${percent(coverage)}`),
    );
    const track = el("div", "efficiency-track");
    const fill = el("span", `efficiency-fill stage-${stage.id}`);
    fill.style.width = `${Math.min(100, coverage * 100)}%`;
    track.append(fill);
    row.append(heading, track);
    bars.append(row);
  });

  const complete = Number(efficiency.complete) || 0;
  qs("#completeJourneyRate").textContent = percent(rate(complete));
  qs("#completeJourneyCount").textContent = `${formatNumber(complete)} ${complete === 1 ? "jornada completa" : "jornadas completas"}`;
  qs("#efficiencyPeriodLabel").textContent = total === 1 ? "1 entrada no período" : `${formatNumber(total)} entradas no período`;

  const statusSummary = qs("#journeyStatusSummary");
  statusSummary.innerHTML = "";
  [
    ["Em andamento", efficiency.inProgress, "current"],
    ["Internadas", efficiency.hospitalized, "hospitalized"],
    ["Pendentes >24h", efficiency.overdue, "overdue"],
    ["Encerradas incompletas", efficiency.closedIncomplete, "incomplete"],
  ].forEach(([label, value, modifier]) => {
    const item = el("div", `journey-status-item is-${modifier}`);
    item.append(el("span", "", label), el("strong", "", formatNumber(value)));
    statusSummary.append(item);
  });

  const nursing = efficiency.nursing || {};
  qs("#nursingIntegrityRate").textContent = percent(Number(nursing.integrityRate) || 0);
  qs("#nursingIntegrityCaption").textContent = `${formatNumber(nursing.integrity)} de ${formatNumber(nursing.passages)} passagens com fluxo íntegro`;
  const nursingMetrics = qs("#nursingQualityMetrics");
  nursingMetrics.innerHTML = "";
  [
    ["Passagens registradas", nursing.passages],
    ["Sem consultório anterior", nursing.withoutPreviousConsult],
    ["Sem continuidade >24h", nursing.withoutContinuity],
  ].forEach(([label, value]) => {
    nursingMetrics.append(el("dt", "", label), el("dd", "", formatNumber(value)));
  });
}

function escapeReportHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function currentLocalDateValue() {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

function registrationReportAnalysis(reportData) {
  const efficiency = reportData.charts?.registrationEfficiency || {};
  const total = Number(efficiency.totalEntries) || 0;
  const stages = Object.fromEntries((efficiency.stages || []).map((stage) => [stage.id, Number(stage.patients) || 0]));
  const rate = (value) => (total ? (Number(value) || 0) / total : 0);
  const nursing = efficiency.nursing || {};
  const overdue = Number(efficiency.overdue) || 0;
  const closedIncomplete = Number(efficiency.closedIncomplete) || 0;
  const nursingWithoutPrevious = Number(nursing.withoutPreviousConsult) || 0;
  const nursingWithoutContinuity = Number(nursing.withoutContinuity) || 0;
  const findings = [];
  const actions = [];

  let level = "stable";
  let label = "REGISTROS SOB MONITORAMENTO";
  let summary = "Não foram identificadas pendências críticas nos registros consolidados até a emissão.";

  if (!total) {
    level = "neutral";
    label = "SEM ENTRADAS REGISTRADAS";
    summary = "Não há jornadas iniciadas no dia para avaliar neste momento.";
  } else if (overdue > 0) {
    level = "critical";
    label = "AÇÃO NECESSÁRIA";
    summary = `${formatNumber(overdue)} ${overdue === 1 ? "jornada permanece" : "jornadas permanecem"} sem desfecho registrado após 24 horas.`;
  } else if (closedIncomplete > 0 || nursingWithoutPrevious > 0 || nursingWithoutContinuity > 0) {
    level = "attention";
    label = "PONTOS PARA CONFERÊNCIA";
    summary = "Há lacunas de sequência ou encerramentos incompletos que merecem conferência operacional.";
  }

  if (total) {
    findings.push(
      `A triagem aparece em ${formatDecimal(rate(stages.triagem) * 100, 1)}% das jornadas iniciadas e o consultório em ${formatDecimal(rate(stages.consultorio) * 100, 1)}%.`,
    );
    findings.push(
      `${formatNumber(stages.desfecho || 0)} de ${formatNumber(total)} jornadas já possuem desfecho registrado; as demais podem estar em andamento no momento da emissão.`,
    );
  }
  if (closedIncomplete > 0) {
    findings.push(`${formatNumber(closedIncomplete)} ${closedIncomplete === 1 ? "jornada encerrada não contém" : "jornadas encerradas não contêm"} todos os pontos obrigatórios.`);
    actions.push("Conferir os encerramentos incompletos e identificar em qual ponto a leitura deixou de ser registrada.");
  }
  if (overdue > 0) {
    actions.push("Revisar as jornadas acima de 24 horas sem internação ou desfecho e regularizar o registro correspondente.");
  }
  if (Number(nursing.passages) > 0) {
    findings.push(
      `A enfermagem possui ${formatNumber(nursing.passages)} passagens, com ${formatNumber(nursing.integrity)} sequências íntegras registradas.`,
    );
  }
  if (nursingWithoutPrevious > 0) {
    actions.push("Verificar passagens na enfermagem sem consultório anterior registrado.");
  }
  if (nursingWithoutContinuity > 0) {
    actions.push("Verificar jornadas cuja última leitura permaneceu na enfermagem por mais de 24 horas.");
  }
  if (!actions.length && total) {
    actions.push("Manter a conferência dos pontos obrigatórios ao longo do turno e revisar novamente antes do fechamento do dia.");
  }

  return { level, label, summary, findings, actions };
}

function buildRegistrationReportHtml(reportData, reportDate) {
  const efficiency = reportData.charts?.registrationEfficiency || {};
  const total = Number(efficiency.totalEntries) || 0;
  const complete = Number(efficiency.complete) || 0;
  const nursing = efficiency.nursing || {};
  const analysis = registrationReportAnalysis(reportData);
  const percent = (value, denominator = total) => `${formatDecimal(denominator ? ((Number(value) || 0) / denominator) * 100 : 0, 1)}%`;
  const reportDateLabel = new Date(`${reportDate}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const generatedAt = new Date(reportData.generatedAt || Date.now()).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const logoMisp = new URL("./assets/logo-misp.png", window.location.href).href;
  const logoCity = new URL("./assets/logo-ceara-mirim.png", window.location.href).href;
  const stageColors = { entrada: "#0f8a83", triagem: "#2166d1", consultorio: "#7c3aed", desfecho: "#1a8f45" };
  const stageRows = (efficiency.stages || []).map((stage) => {
    const coverage = total ? ((Number(stage.patients) || 0) / total) * 100 : 0;
    return `<div class="coverage-row">
      <div class="coverage-heading"><strong>${escapeReportHtml(stage.label)}</strong><span>${formatNumber(stage.patients)} de ${formatNumber(total)} · ${formatDecimal(coverage, 1)}%</span></div>
      <div class="coverage-track"><span style="width:${Math.min(100, coverage)}%;background:${stageColors[stage.id] || "#64748b"}"></span></div>
    </div>`;
  }).join("");
  const leadRows = (reportData.charts?.leadByStep || [])
    .filter((item) => !hiddenDashboardSteps.has(item.id))
    .sort((a, b) => (Number(b.value) || 0) - (Number(a.value) || 0))
    .slice(0, 8)
    .map((item) => `<tr><td>${escapeReportHtml(displayLabel(item))}</td><td>${formatDecimal(item.value, 1)} min</td><td>${formatNumber(item.visits || 0)}</td></tr>`)
    .join("");
  const findings = analysis.findings.map((item) => `<li>${escapeReportHtml(item)}</li>`).join("");
  const actions = analysis.actions.map((item) => `<li>${escapeReportHtml(item)}</li>`).join("");

  return `<!doctype html>
  <html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Relatório sobre registros - ${escapeReportHtml(reportDateLabel)}</title>
    <style>
      :root{--ink:#17202a;--muted:#64748b;--line:#d8e1ea;--teal:#0f8a83;--blue:#2166d1;--green:#1a8f45;--orange:#d97706;--red:#c93333;--purple:#7c3aed}
      *{box-sizing:border-box} body{margin:0;color:var(--ink);background:#eef3f7;font-family:Arial,"Segoe UI",sans-serif;font-size:10pt;letter-spacing:0}
      .report{width:min(210mm,100%);min-height:297mm;margin:0 auto;padding:12mm;background:#fff}
      header{display:grid;grid-template-columns:54mm 1fr 27mm;align-items:center;gap:8mm;padding-bottom:7mm;border-bottom:2px solid var(--teal)}
      header img{display:block;max-width:100%;max-height:24mm;object-fit:contain} header .city{justify-self:end}
      .eyebrow{margin:0 0 2mm;color:var(--teal);font-size:8pt;font-weight:800;text-transform:uppercase}.title h1{margin:0;font-size:20pt;line-height:1.08}.title p{margin:2mm 0 0;color:var(--muted)}
      .meta{display:flex;justify-content:space-between;gap:8mm;margin:5mm 0 6mm;color:var(--muted);font-size:8.5pt}.meta strong{color:var(--ink)}
      .diagnosis{display:grid;grid-template-columns:44mm 1fr;gap:5mm;padding:5mm;border:1px solid var(--line);border-left:5px solid var(--teal);background:#f7fafc}.diagnosis.attention{border-left-color:var(--orange)}.diagnosis.critical{border-left-color:var(--red)}.diagnosis.neutral{border-left-color:var(--muted)}
      .diagnosis-label{font-size:11pt;font-weight:900;color:var(--teal)}.diagnosis.attention .diagnosis-label{color:var(--orange)}.diagnosis.critical .diagnosis-label{color:var(--red)}.diagnosis p{margin:0;line-height:1.45}
      .kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:3mm;margin:6mm 0}.kpi{min-height:24mm;padding:4mm;border:1px solid var(--line);background:#fff}.kpi span{display:block;color:var(--muted);font-size:7.5pt;font-weight:700}.kpi strong{display:block;margin-top:3mm;font-size:17pt;line-height:1}.kpi small{display:block;margin-top:2mm;color:var(--muted)}
      section{margin-top:7mm;break-inside:avoid}.section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:6mm;margin-bottom:4mm;padding-bottom:2mm;border-bottom:1px solid var(--line)}.section-heading h2{margin:0;font-size:13pt}.section-heading span{color:var(--muted);font-size:8pt}
      .coverage{display:grid;gap:3.5mm}.coverage-heading{display:flex;justify-content:space-between;gap:5mm;margin-bottom:1.5mm}.coverage-heading span{color:var(--muted);font-size:8pt;font-weight:700}.coverage-track{height:4mm;overflow:hidden;background:#e7edf3}.coverage-track span{display:block;height:100%}
      .two-columns{display:grid;grid-template-columns:1.18fr .82fr;gap:6mm}.fact-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:3mm}.fact{padding:4mm;border:1px solid var(--line);background:#f7fafc}.fact span{display:block;color:var(--muted);font-size:8pt;font-weight:700}.fact strong{display:block;margin-top:2mm;font-size:15pt}
      table{width:100%;border-collapse:collapse}th,td{padding:2.5mm;border-bottom:1px solid var(--line);text-align:left}th{color:var(--muted);background:#eef4f8;font-size:8pt;text-transform:uppercase}td:nth-child(2),td:nth-child(3),th:nth-child(2),th:nth-child(3){text-align:right}
      .notes{display:grid;grid-template-columns:1fr 1fr;gap:5mm}.note-box{padding:4mm;border:1px solid var(--line);background:#fff}.note-box h3{margin:0 0 3mm;font-size:10.5pt}.note-box ul{margin:0;padding-left:5mm}.note-box li{margin:0 0 2mm;line-height:1.4}
      footer{margin-top:8mm;padding-top:3mm;border-top:1px solid var(--line);color:var(--muted);font-size:7.5pt;line-height:1.4}
      @page{size:A4 portrait;margin:0}@media print{body{background:#fff}.report{width:210mm;min-height:297mm;margin:0;padding:12mm}.page-break{break-before:page}}
      @media(max-width:760px){.report{padding:18px}.kpis{grid-template-columns:repeat(2,1fr)}.two-columns,.notes,.diagnosis,header{grid-template-columns:1fr}.meta{flex-direction:column}.city{display:none}}
    </style>
  </head>
  <body>
    <main class="report">
      <header><img src="${escapeReportHtml(logoMisp)}" alt="MISP UFRN"><div class="title"><p class="eyebrow">Qualidade do registro</p><h1>Relatório sobre registros da jornada</h1><p>Situação das leituras realizadas nos pontos do atendimento</p></div><img class="city" src="${escapeReportHtml(logoCity)}" alt="Prefeitura de Ceará-Mirim"></header>
      <div class="meta"><span><strong>Período:</strong> ${escapeReportHtml(reportDateLabel)}</span><span><strong>Emitido em:</strong> ${escapeReportHtml(generatedAt)}</span></div>
      <div class="diagnosis ${analysis.level}"><div class="diagnosis-label">${escapeReportHtml(analysis.label)}</div><p>${escapeReportHtml(analysis.summary)}</p></div>
      <div class="kpis">
        <div class="kpi"><span>Entradas registradas</span><strong>${formatNumber(total)}</strong><small>Base do relatório</small></div>
        <div class="kpi"><span>Jornadas completas</span><strong>${percent(complete)}</strong><small>${formatNumber(complete)} registros completos</small></div>
        <div class="kpi"><span>Em andamento</span><strong>${formatNumber(efficiency.inProgress || 0)}</strong><small>Sem penalização</small></div>
        <div class="kpi"><span>Pendentes acima de 24h</span><strong>${formatNumber(efficiency.overdue || 0)}</strong><small>Sem internação ou desfecho</small></div>
        <div class="kpi"><span>Encerradas incompletas</span><strong>${formatNumber(efficiency.closedIncomplete || 0)}</strong><small>Com pontos obrigatórios ausentes</small></div>
      </div>

      <section><div class="section-heading"><h2>Cobertura dos pontos obrigatórios</h2><span>Percentuais sobre as entradas do dia</span></div><div class="coverage">${stageRows || "<p>Sem dados no período.</p>"}</div></section>

      <section class="two-columns">
        <div><div class="section-heading"><h2>Ciclo temporal dos registros</h2><span>Tempo entre as leituras</span></div>
          <div class="fact-grid"><div class="fact"><span>Permanência média até o desfecho</span><strong>${escapeReportHtml(reportData.kpis?.permanenciaMediaLabel || "00:00")}</strong></div><div class="fact"><span>Maior tempo médio entre pontos</span><strong>${escapeReportHtml(reportData.kpis?.gargaloAtualLabel || "Sem dados")}</strong><small>${escapeReportHtml(reportData.kpis?.gargaloAtualTempoLabel || "0 min")}</small></div></div>
          <table><thead><tr><th>Ponto registrado</th><th>Tempo médio</th><th>Leituras</th></tr></thead><tbody>${leadRows || "<tr><td colspan=\"3\">Sem intervalos calculados.</td></tr>"}</tbody></table>
        </div>
        <div><div class="section-heading"><h2>Integridade da enfermagem</h2><span>Sequência registrada</span></div>
          <div class="fact-grid"><div class="fact"><span>Fluxo íntegro</span><strong>${percent(nursing.integrity || 0, nursing.passages || 0)}</strong></div><div class="fact"><span>Passagens</span><strong>${formatNumber(nursing.passages || 0)}</strong></div><div class="fact"><span>Sem consultório anterior</span><strong>${formatNumber(nursing.withoutPreviousConsult || 0)}</strong></div><div class="fact"><span>Sem continuidade acima de 24h</span><strong>${formatNumber(nursing.withoutContinuity || 0)}</strong></div></div>
        </div>
      </section>

      <section><div class="section-heading"><h2>Leitura rápida da situação</h2><span>Análise automática para apoio à conferência</span></div><div class="notes"><div class="note-box"><h3>O que os registros mostram</h3><ul>${findings || "<li>Sem dados suficientes para análise.</li>"}</ul></div><div class="note-box"><h3>Ações sugeridas</h3><ul>${actions || "<li>Aguardar novas entradas e emitir o relatório novamente.</li>"}</ul></div></div></section>
      <footer>Este relatório avalia somente a presença, a sequência e os intervalos dos registros da jornada. Ele não substitui prontuário, auditoria clínica ou avaliação assistencial e não contém dados pessoais dos pacientes.</footer>
    </main>
  </body></html>`;
}

async function generateRegistrationReport() {
  const button = qs("#registrationReportButton");
  const dialog = qs("#registrationReportDialog");
  const frame = qs("#registrationReportFrame");
  const printButton = qs("#registrationReportPrint");
  const summary = qs("#registrationReportSummary");
  if (!dialog || !frame || !printButton || !summary) return;

  frame.srcdoc = "<!doctype html><meta charset=\"utf-8\"><body style=\"font-family:Arial;padding:32px\"><h1>Gerando relatório...</h1><p>Consultando os registros do dia atual.</p></body>";
  printButton.disabled = true;
  summary.textContent = "Consultando os registros do dia atual.";
  if (!dialog.open) dialog.showModal();
  if (button) {
    button.disabled = true;
    button.textContent = "Gerando relatório...";
  }

  const reportDate = currentLocalDateValue();
  const url = dashboardRequestUrlForPeriod(reportDate, reportDate);
  let lastError = null;
  try {
    let reportData = null;
    for (let attempt = 0; attempt < 2 && !reportData; attempt += 1) {
      try {
        const candidate = await requestDashboardDataFromUrl(url);
        const filters = candidate.meta?.filters || {};
        if (filters.dateFrom !== reportDate || filters.dateTo !== reportDate || !candidate.meta?.isSingleDay) {
          throw new Error("A fonte não retornou a consolidação do dia atual");
        }
        reportData = candidate;
      } catch (error) {
        lastError = error;
        if (attempt === 0) await new Promise((resolve) => window.setTimeout(resolve, 900));
      }
    }
    if (!reportData && currentDayReportData) reportData = currentDayReportData;
    if (!reportData) throw lastError || new Error("Não foi possível consultar os registros");
    frame.srcdoc = buildRegistrationReportHtml(reportData, reportDate);
    printButton.disabled = false;
    summary.textContent = "Visão consolidada das leituras realizadas no dia atual.";
  } catch (error) {
    frame.srcdoc = `<!doctype html><meta charset="utf-8"><title>Falha ao gerar relatório</title><body style="font-family:Arial;padding:32px"><h1>Não foi possível gerar o relatório</h1><p>${escapeReportHtml(error.message || "Falha ao consultar os dados do dia.")}</p></body>`;
    summary.textContent = "Falha ao consultar os dados do dia atual.";
    setRefreshStatus("error", "Falha ao gerar relatório sobre registros");
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Relatório sobre registros";
    }
  }
}

function setupRegistrationReport() {
  qs("#registrationReportButton")?.addEventListener("click", generateRegistrationReport);
  qs("#registrationReportPrint")?.addEventListener("click", () => {
    const frame = qs("#registrationReportFrame");
    if (frame?.contentWindow) frame.contentWindow.print();
  });
}

function renderQuality() {
  const list = qs("#qualityList");
  const items = [
    [
      "Normalização de etapas",
      "O dashboard remove acentos de forma geral e compara etapas em minúsculo com underscore. Isso cobre transferência, óbito, internação, aguardando triagem e consultórios.",
    ],
    [
      "Prioridades assistenciais",
      "A classificação de gravidade usa apenas as prioridades do app: Emergência 10 min, Urgente 60 min, Pouco urgente 120 min e Não urgente 240 min. O número grande mostra pacientes ainda em jornada; o tempo médio considera todos os classificados.",
    ],
    [
      "Pacientes atuais",
      "A contagem considera jornadas iniciadas a partir de 23/09/2026: boletins valem por 24 horas, pacientes em internação permanecem ativos, e alta hospitalar, óbito ou transferência encerram a jornada.",
    ],
    [
      "Permanência",
      "O cálculo usa a primeira movimentação e a última etapa final normalizada, evitando o problema de Alta_hospitalar com maiúscula.",
    ],
    [
      "Privacidade",
      "O painel público exporta apenas agregações. Nome, CPF e jornada individual ficam disponíveis somente na aplicação local e na rede privada do hospital.",
    ],
    [
      "Pacientes únicos",
      "Sexo, faixa assistencial, origem e o card de pacientes usam CPF normalizado para não duplicar pessoas que retornaram ao hospital.",
    ],
  ];
  list.innerHTML = "";
  items.forEach(([title, body]) => {
    const item = el("div", "quality-item");
    item.append(el("h3", "", title), el("p", "", body));
    list.append(item);
  });

  const integrity = qs("#integrityGrid");
  const checks = [
    ["Registros sem paciente", data.quality.registrosSemPaciente.length],
    ["Prioridades sem paciente", data.quality.gravidadeSemPacienteCount],
    ["Etapas fora da dimensão", data.quality.etapasRegistroForaSpots.length],
    ["QRs únicos", data.quality.qrIdsUnicos],
    ["QRs duplicados", data.quality.qrDuplicados],
  ];
  integrity.innerHTML = "";
  checks.forEach(([title, value]) => {
    const card = el("div", "integrity-card");
    card.append(el("h3", "", title), el("p", "", formatNumber(value)));
    integrity.append(card);
  });
}

function setupTabs() {
  if (!isDevMode) {
    document.querySelector('[data-target="qualidade"]')?.remove();
    qs("#qualidade")?.remove();
  }

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab-button").forEach((b) => b.classList.remove("is-active"));
      document.querySelectorAll(".view-panel").forEach((p) => p.classList.remove("is-active"));
      button.classList.add("is-active");
      qs(`#${button.dataset.target}`).classList.add("is-active");
    });
  });
}

function setRefreshStatus(state, message) {
  const status = qs("#refreshStatus");
  const text = qs("#refreshText");
  if (!status || !text) return;
  status.classList.toggle("is-live", state === "live");
  status.classList.toggle("is-error", state === "error");
  text.textContent = message;
}

function formatClock(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function renderDashboard(nextData = data) {
  data = nextData;
  const reportDate = currentLocalDateValue();
  if (
    data.meta?.filters?.dateFrom === reportDate
    && data.meta?.filters?.dateTo === reportDate
    && data.meta?.isSingleDay
  ) {
    currentDayReportData = data;
  }
  const isFiltered = Boolean(data.meta?.isFiltered);
  const isSingleDay = Boolean(data.meta?.isSingleDay);
  renderKpis();
  qs("#leadChip").textContent = `${data.kpis.mediaLeadLabel} médio`;
  qs("#activeChip").textContent = isSingleDay
    ? `${formatNumber(data.kpis.pacientesAtuais)} no dia`
    : isFiltered
      ? `${formatNumber(data.kpis.pacientesAtuais)} pacientes atuais`
    : `${formatNumber(data.kpis.pacientesAtuais)} pacientes atuais`;
  qs("#sectorTitle").textContent = isSingleDay
    ? "Situação das jornadas iniciadas no dia"
    : "Pacientes atuais por setor";
  qs("#gravityTitle").textContent = usePeriodTriageTotals()
    ? "Triados no período por prioridade"
    : "Em jornada por prioridade";
  qs("#resolutionGauge").style.setProperty("--value", `${data.kpis.resolutividade * 100}%`);
  qs("#resolutionLabel").textContent = data.kpis.resolutividadeLabel;
  qs("#permanenceLabel").textContent = data.kpis.permanenciaMediaLabel;
  qs("#readmissionLabel").textContent = data.kpis.taxaReingressoLabel;

  renderLeadRanking();
  renderGravity();
  renderDonut("sexDonut", data.charts.sex);
  renderDonut("ageDonut", data.charts.ageClass);
  renderDailyAverage();
  renderBars("cityChart", data.charts.cities);
  renderLineChart();
  renderSectors();
  renderOutcomes();
  renderRegistrationEfficiency();
  prefetchPublicJourneyLists();
  if (isDevMode) renderQuality();
}

async function refreshDashboard() {
  if (refreshInFlight) return;
  refreshInFlight = true;
  if (publicApiUrl) setRefreshStatus("snapshot", "Atualizando dados...");
  try {
    const nextData = await requestDashboardDataWithRetry();
    renderDashboard(nextData);
    const updatedAt = formatClock(nextData.generatedAt);
    setRefreshStatus("live", `Atualizado ${updatedAt}`);
  } catch (error) {
    setRefreshStatus(
      "error",
      publicApiUrl ? "Falha ao atualizar; nova tentativa automática" : "Usando snapshot local",
    );
  } finally {
    refreshInFlight = false;
  }
}

function startAutoRefresh() {
  if (window.location.protocol === "file:" && !publicApiUrl) {
    setRefreshStatus("snapshot", "Snapshot local");
    return;
  }
  refreshDashboard();
  refreshTimer = window.setInterval(refreshDashboard, refreshIntervalMs);
}

function setupDateFilter() {
  const form = qs("#dateFilter");
  const dateFrom = qs("#dateFrom");
  const dateTo = qs("#dateTo");
  const clearButton = qs("#clearDateFilter");
  if (!form || !dateFrom || !dateTo || !clearButton) return;

  const today = new Date();
  const todayValue = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  const hasDateParams = initialParams.has("date_from") || initialParams.has("date_to");

  dateFrom.value = hasDateParams ? initialParams.get("date_from") || "" : todayValue;
  dateTo.value = hasDateParams ? initialParams.get("date_to") || "" : todayValue;
  if (!hasDateParams) updateFilterUrl();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (dateFrom.value && dateTo.value && dateFrom.value > dateTo.value) {
      setRefreshStatus("error", "Período inválido");
      return;
    }
    resetPublicJourneyLists();
    updateFilterUrl();
    refreshDashboard();
  });

  clearButton.addEventListener("click", () => {
    dateFrom.value = "";
    dateTo.value = "";
    resetPublicJourneyLists();
    updateFilterUrl();
    refreshDashboard();
  });
}

function init() {
  setupDateFilter();
  if (data) renderDashboard(data);
  else setRefreshStatus("snapshot", "Carregando dados");
  if (publicApiUrl) setRefreshStatus("snapshot", "Atualizando dados...");
  setupTabs();
  setupDetailDialogs();
  setupRegistrationReport();
  startAutoRefresh();
}

init();
