window.HOMISP_DASHBOARD_DATA = {
  "generatedAt": "2026-09-29T10:13:00",
  "source": {
    "sheetId": "1eXlFlYblp2GOmqQbfwrQ7jA5UD8Us7KEScU7LpfX6FQ"
  },
  "meta": {
    "sourceMode": "Google Sheets",
    "refreshIntervalSeconds": 30,
    "filters": {
      "dateFrom": "",
      "dateTo": ""
    },
    "isFiltered": false,
    "isSingleDay": false,
    "fallbackErrors": []
  },
  "notes": [
    "Etapas normalizadas com lower-case, underscore e remocao geral de acentos.",
    "Saidas finais tratadas como alta_hospitalar, obito e transferencia.",
    "Pacientes atuais consideram boletins validos a partir de 23/09/2026 por ate 24 horas; internados permanecem ate um desfecho final.",
    "Quando o filtro cobre um unico dia, os cards operacionais mostram somente as jornadas iniciadas naquele dia.",
    "Perfil demografico e total de pacientes deduplicados por CPF normalizado.",
    "Dados pessoais de pacientes nao foram exportados para este dashboard."
  ],
  "kpis": {
    "totalPacientes": 8188,
    "pacientesSemCpf": 667,
    "totalAtendimentos": 12343,
    "pacientesAtuais": 220,
    "registros": 19264,
    "gravidades": 3750,
    "resolutividade": 1.0,
    "resolutividadeLabel": "100%",
    "mediaLeadMinutos": 33.3,
    "mediaLeadLabel": "00:33",
    "gargaloAtual": "enfermagem",
    "gargaloAtualLabel": "Enfermagem",
    "gargaloAtualTempo": 63.3,
    "gargaloAtualTempoLabel": "63.3 min",
    "permanenciaMediaMinutos": 137.6,
    "permanenciaMediaLabel": "02:18",
    "taxaReingresso": 0.2889,
    "taxaReingressoLabel": "28.9%",
    "mediaPacientesDia": 248.7,
    "mediaPacientesDiaLabel": "248,7",
    "diasComEntrada": 49
  },
  "sectors": [
    {
      "id": "recepcao_adulto",
      "label": "Aguardando triagem adulto",
      "current": 88,
      "visits": 12301,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "recepcao_infantil",
      "label": "Aguardando triagem infantil",
      "current": 0,
      "visits": 8,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "triagem_adulto",
      "label": "Triagem adulto",
      "current": 50,
      "visits": 3752,
      "avgLeadMinutes": 17.6,
      "totalLeadMinutes": 65928,
      "isFinal": false
    },
    {
      "id": "triagem_infantil",
      "label": "Triagem infantil",
      "current": 0,
      "visits": 0,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "consultorio_adulto_1",
      "label": "Consultório adulto 1",
      "current": 11,
      "visits": 736,
      "avgLeadMinutes": 48.3,
      "totalLeadMinutes": 35535,
      "isFinal": false
    },
    {
      "id": "consultorio_adulto_2",
      "label": "Consultório adulto 2",
      "current": 0,
      "visits": 0,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "consultorio_adulto_3",
      "label": "Consultório adulto 3",
      "current": 45,
      "visits": 966,
      "avgLeadMinutes": 50.8,
      "totalLeadMinutes": 49037,
      "isFinal": false
    },
    {
      "id": "consultorio_pediatrico_1",
      "label": "Consultório pediátrico 1",
      "current": 0,
      "visits": 0,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "consultorio_pediatrico_2",
      "label": "Consultório pediátrico 2",
      "current": 0,
      "visits": 0,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "consultorio_pediatrico_3",
      "label": "Consultório pediátrico 3",
      "current": 0,
      "visits": 0,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "enfermagem",
      "label": "Enfermagem",
      "current": 26,
      "visits": 1046,
      "avgLeadMinutes": 63.3,
      "totalLeadMinutes": 66243,
      "isFinal": false
    },
    {
      "id": "internacao",
      "label": "Internação",
      "current": 0,
      "visits": 1,
      "avgLeadMinutes": 1.0,
      "totalLeadMinutes": 1,
      "isFinal": false
    },
    {
      "id": "transferencia",
      "label": "Transferência",
      "current": 0,
      "visits": 0,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": true
    },
    {
      "id": "alta_hospitalar",
      "label": "Alta hospitalar",
      "current": 0,
      "visits": 454,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": true
    }
  ],
  "charts": {
    "sex": [
      {
        "label": "Feminino",
        "value": 4632
      },
      {
        "label": "Masculino",
        "value": 3548
      },
      {
        "label": "Não informado",
        "value": 8
      }
    ],
    "ageClass": [
      {
        "label": "Adulto",
        "value": 8181
      },
      {
        "label": "Infantil",
        "value": 7
      }
    ],
    "cities": [
      {
        "label": "Ceará-Mirim",
        "value": 8020
      },
      {
        "label": "Natal",
        "value": 46
      },
      {
        "label": "Ielmo Marinho",
        "value": 26
      },
      {
        "label": "Taipu",
        "value": 13
      },
      {
        "label": "Rio do Fogo",
        "value": 11
      },
      {
        "label": "Outro município",
        "value": 11
      },
      {
        "label": "Maxaranguape",
        "value": 10
      },
      {
        "label": "São Gonçalo do Amarante",
        "value": 7
      },
      {
        "label": "Pureza",
        "value": 7
      },
      {
        "label": "Extremoz",
        "value": 6
      },
      {
        "label": "Poço Branco",
        "value": 6
      },
      {
        "label": "Bento Fernandes",
        "value": 5
      }
    ],
    "entries": [
      {
        "date": "2026-08-12",
        "value": 39
      },
      {
        "date": "2026-08-13",
        "value": 192
      },
      {
        "date": "2026-08-14",
        "value": 270
      },
      {
        "date": "2026-08-15",
        "value": 247
      },
      {
        "date": "2026-08-16",
        "value": 192
      },
      {
        "date": "2026-08-17",
        "value": 314
      },
      {
        "date": "2026-08-18",
        "value": 317
      },
      {
        "date": "2026-08-19",
        "value": 271
      },
      {
        "date": "2026-08-20",
        "value": 284
      },
      {
        "date": "2026-08-21",
        "value": 246
      },
      {
        "date": "2026-08-22",
        "value": 237
      },
      {
        "date": "2026-08-23",
        "value": 219
      },
      {
        "date": "2026-08-24",
        "value": 289
      },
      {
        "date": "2026-08-25",
        "value": 268
      },
      {
        "date": "2026-08-26",
        "value": 260
      },
      {
        "date": "2026-08-27",
        "value": 297
      },
      {
        "date": "2026-08-28",
        "value": 313
      },
      {
        "date": "2026-08-29",
        "value": 232
      },
      {
        "date": "2026-08-30",
        "value": 198
      },
      {
        "date": "2026-08-31",
        "value": 327
      },
      {
        "date": "2026-09-01",
        "value": 302
      },
      {
        "date": "2026-09-02",
        "value": 285
      },
      {
        "date": "2026-09-03",
        "value": 306
      },
      {
        "date": "2026-09-04",
        "value": 282
      },
      {
        "date": "2026-09-05",
        "value": 222
      },
      {
        "date": "2026-09-06",
        "value": 205
      },
      {
        "date": "2026-09-07",
        "value": 236
      },
      {
        "date": "2026-09-08",
        "value": 246
      },
      {
        "date": "2026-09-09",
        "value": 221
      },
      {
        "date": "2026-09-10",
        "value": 307
      },
      {
        "date": "2026-09-11",
        "value": 242
      },
      {
        "date": "2026-09-12",
        "value": 242
      },
      {
        "date": "2026-09-13",
        "value": 222
      },
      {
        "date": "2026-09-14",
        "value": 211
      },
      {
        "date": "2026-09-15",
        "value": 224
      },
      {
        "date": "2026-09-16",
        "value": 273
      },
      {
        "date": "2026-09-17",
        "value": 279
      },
      {
        "date": "2026-09-18",
        "value": 240
      },
      {
        "date": "2026-09-19",
        "value": 240
      },
      {
        "date": "2026-09-20",
        "value": 216
      },
      {
        "date": "2026-09-21",
        "value": 303
      },
      {
        "date": "2026-09-22",
        "value": 269
      },
      {
        "date": "2026-09-23",
        "value": 267
      },
      {
        "date": "2026-09-24",
        "value": 237
      },
      {
        "date": "2026-09-25",
        "value": 227
      },
      {
        "date": "2026-09-26",
        "value": 244
      },
      {
        "date": "2026-09-27",
        "value": 223
      },
      {
        "date": "2026-09-28",
        "value": 294
      },
      {
        "date": "2026-09-29",
        "value": 109
      }
    ],
    "gravity": [
      {
        "id": "prioridade_10",
        "label": "Emergência",
        "targetLabel": "10 min",
        "patients": 4,
        "totalClassified": 193,
        "avgLeadMinutes": 21.7,
        "avgLeadLabel": "00:22"
      },
      {
        "id": "prioridade_60",
        "label": "Urgente",
        "targetLabel": "60 min",
        "patients": 3,
        "totalClassified": 653,
        "avgLeadMinutes": 19.3,
        "avgLeadLabel": "00:19"
      },
      {
        "id": "prioridade_120",
        "label": "Pouco urgente",
        "targetLabel": "120 min",
        "patients": 39,
        "totalClassified": 1375,
        "avgLeadMinutes": 19.1,
        "avgLeadLabel": "00:19"
      },
      {
        "id": "prioridade_240",
        "label": "Não urgente",
        "targetLabel": "240 min",
        "patients": 32,
        "totalClassified": 1454,
        "avgLeadMinutes": 15.3,
        "avgLeadLabel": "00:15"
      }
    ],
    "outcomes": [
      {
        "id": "alta_hospitalar",
        "label": "Alta hospitalar",
        "patients": 400
      },
      {
        "id": "transferencia",
        "label": "Transferência",
        "patients": 0
      },
      {
        "id": "obito",
        "label": "Óbito",
        "patients": 0
      }
    ],
    "leadByStep": [
      {
        "label": "Enfermagem",
        "value": 63.3,
        "id": "enfermagem",
        "current": 26,
        "visits": 1046
      },
      {
        "label": "Consultório adulto 3",
        "value": 50.8,
        "id": "consultorio_adulto_3",
        "current": 45,
        "visits": 966
      },
      {
        "label": "Consultório adulto 1",
        "value": 48.3,
        "id": "consultorio_adulto_1",
        "current": 11,
        "visits": 736
      },
      {
        "label": "Triagem adulto",
        "value": 17.6,
        "id": "triagem_adulto",
        "current": 50,
        "visits": 3752
      },
      {
        "label": "Internação",
        "value": 1.0,
        "id": "internacao",
        "current": 0,
        "visits": 1
      }
    ],
    "registrationEfficiency": {
      "totalEntries": 12186,
      "stages": [
        {
          "id": "entrada",
          "label": "Entrada registrada",
          "patients": 12186
        },
        {
          "id": "triagem",
          "label": "Triagem registrada",
          "patients": 3616
        },
        {
          "id": "consultorio",
          "label": "Consultório registrado",
          "patients": 1606
        },
        {
          "id": "desfecho",
          "label": "Desfecho registrado",
          "patients": 412
        }
      ],
      "complete": 111,
      "closedIncomplete": 301,
      "inProgress": 219,
      "hospitalized": 0,
      "overdue": 11555,
      "nursing": {
        "passages": 939,
        "integrity": 39,
        "integrityRate": 0.0415,
        "withoutPreviousConsult": 753,
        "withoutContinuity": 766
      }
    }
  },
  "quality": {
    "registrosSemPaciente": [
      "010404011441",
      "0279736b",
      "044a8dc6",
      "06402266",
      "09695b2e",
      "0c77f736",
      "1c531fb7",
      "1db74317",
      "1fa8ee71",
      "205b0cab",
      "24803e5e",
      "4c1ab276",
      "5bd198e0",
      "656ed973",
      "746be237",
      "7897154490558",
      "7f1e7872",
      "a2d5e5d6",
      "d77803ba",
      "e29d555e",
      "ec4a574c",
      "ed16c862",
      "f9c79992"
    ],
    "gravidadeSemPacienteCount": 22,
    "etapasRegistroForaSpots": [],
    "qrIdsUnicos": 0,
    "qrDuplicados": 0
  }
};
