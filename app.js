let data = window.HOMISP_DASHBOARD_DATA;
let refreshTimer = null;
let refreshInFlight = false;

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

const hiddenDashboardSteps = new Set(["consultorio_adulto_4"]);

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
  if (publicApiMode) return publicApiMode === "jsonp";
  return publicApiUrl.includes("script.google.com/") || publicApiUrl.includes("script.googleusercontent.com/");
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
    }, 25000);

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
  if (shouldUseJsonp()) {
    return loadJsonp(url);
  }

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
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
  const total = items.reduce((sum, item) => sum + (Number(item.patients) || 0), 0);
  items.forEach((item) => {
    const share = total ? ((Number(item.patients) || 0) / total) * 100 : 0;
    const card = el("div", "gravity-card");
    const main = el("div", "gravity-card-main");
    card.style.setProperty("--gravity-color", priorityColors[item.id] || "#64748b");
    card.setAttribute("aria-label", `${item.label}: ${formatNumber(item.patients)} pacientes, ${formatDecimal(share)}% do total`);
    card.append(el("span", "", `${item.label} ${item.targetLabel || ""}`.trim()));
    main.append(el("strong", "", formatNumber(item.patients)));
    main.append(el("em", "gravity-share", `${formatDecimal(share)}%`));
    card.append(main);
    card.append(el("small", "", `${item.avgLeadLabel} médio geral`));
    grid.append(card);
  });
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
    grid.append(card);
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
    grid.append(card);
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
      "Este painel exporta apenas agregações. Nomes, CPFs e identificadores individuais não aparecem na interface.",
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
    updateFilterUrl();
    refreshDashboard();
  });

  clearButton.addEventListener("click", () => {
    dateFrom.value = "";
    dateTo.value = "";
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
  startAutoRefresh();
}

init();
