window.HOMISP_DASHBOARD_DATA = {
  "generatedAt": "2026-09-29T09:58:04",
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
    "totalPacientes": 8184,
    "pacientesSemCpf": 667,
    "totalAtendimentos": 12334,
    "pacientesAtuais": 217,
    "registros": 19247,
    "gravidades": 3745,
    "resolutividade": 1.0,
    "resolutividadeLabel": "100%",
    "mediaLeadMinutos": 33.3,
    "mediaLeadLabel": "00:33",
    "gargaloAtual": "enfermagem",
    "gargaloAtualLabel": "Enfermagem",
    "gargaloAtualTempo": 63.2,
    "gargaloAtualTempoLabel": "63.2 min",
    "permanenciaMediaMinutos": 137.7,
    "permanenciaMediaLabel": "02:18",
    "taxaReingresso": 0.2888,
    "taxaReingressoLabel": "28.9%",
    "mediaPacientesDia": 248.6,
    "mediaPacientesDiaLabel": "248,6",
    "diasComEntrada": 49
  },
  "sectors": [
    {
      "id": "recepcao_adulto",
      "label": "Aguardando triagem adulto",
      "current": 86,
      "visits": 12292,
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
      "current": 48,
      "visits": 3747,
      "avgLeadMinutes": 17.5,
      "totalLeadMinutes": 65585,
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
      "visits": 735,
      "avgLeadMinutes": 48.3,
      "totalLeadMinutes": 35523,
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
      "current": 47,
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
      "current": 25,
      "visits": 1045,
      "avgLeadMinutes": 63.2,
      "totalLeadMinutes": 66021,
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
      "visits": 453,
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
        "value": 3544
      },
      {
        "label": "Não informado",
        "value": 8
      }
    ],
    "ageClass": [
      {
        "label": "Adulto",
        "value": 8177
      },
      {
        "label": "Infantil",
        "value": 7
      }
    ],
    "cities": [
      {
        "label": "Ceará-Mirim",
        "value": 8016
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
        "value": 102
      }
    ],
    "gravity": [
      {
        "id": "prioridade_10",
        "label": "Emergência",
        "targetLabel": "10 min",
        "patients": 4,
        "totalClassified": 193,
        "avgLeadMinutes": 21.8,
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
        "patients": 35,
        "totalClassified": 1370,
        "avgLeadMinutes": 19.1,
        "avgLeadLabel": "00:19"
      },
      {
        "id": "prioridade_240",
        "label": "Não urgente",
        "targetLabel": "240 min",
        "patients": 34,
        "totalClassified": 1454,
        "avgLeadMinutes": 15.3,
        "avgLeadLabel": "00:15"
      }
    ],
    "outcomes": [
      {
        "id": "alta_hospitalar",
        "label": "Alta hospitalar",
        "patients": 399
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
        "value": 63.2,
        "id": "enfermagem",
        "current": 25,
        "visits": 1045
      },
      {
        "label": "Consultório adulto 3",
        "value": 50.8,
        "id": "consultorio_adulto_3",
        "current": 47,
        "visits": 966
      },
      {
        "label": "Consultório adulto 1",
        "value": 48.3,
        "id": "consultorio_adulto_1",
        "current": 11,
        "visits": 735
      },
      {
        "label": "Triagem adulto",
        "value": 17.5,
        "id": "triagem_adulto",
        "current": 48,
        "visits": 3747
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
      "totalEntries": 12179,
      "stages": [
        {
          "id": "entrada",
          "label": "Entrada registrada",
          "patients": 12179
        },
        {
          "id": "triagem",
          "label": "Triagem registrada",
          "patients": 3611
        },
        {
          "id": "consultorio",
          "label": "Consultório registrado",
          "patients": 1605
        },
        {
          "id": "desfecho",
          "label": "Desfecho registrado",
          "patients": 411
        }
      ],
      "complete": 110,
      "closedIncomplete": 301,
      "inProgress": 216,
      "hospitalized": 0,
      "overdue": 11552,
      "nursing": {
        "passages": 938,
        "integrity": 39,
        "integrityRate": 0.0416,
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
