window.HOMISP_DASHBOARD_DATA = {
  "generatedAt": "2026-10-28T16:30:19",
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
    "totalPacientes": 11995,
    "pacientesSemCpf": 1036,
    "totalAtendimentos": 20177,
    "pacientesAtuais": 222,
    "registros": 39046,
    "gravidades": 7427,
    "resolutividade": 1.0,
    "resolutividadeLabel": "100%",
    "mediaLeadMinutos": 40.3,
    "mediaLeadLabel": "00:40",
    "gargaloAtual": "enfermagem",
    "gargaloAtualLabel": "Enfermagem",
    "gargaloAtualTempo": 93.9,
    "gargaloAtualTempoLabel": "93.9 min",
    "permanenciaMediaMinutos": 190568.7,
    "permanenciaMediaLabel": "3176:09",
    "taxaReingresso": 0.3249,
    "taxaReingressoLabel": "32.5%",
    "mediaPacientesDia": 254.0,
    "mediaPacientesDiaLabel": "254,0",
    "diasComEntrada": 78
  },
  "sectors": [
    {
      "id": "recepcao_adulto",
      "label": "Aguardando triagem adulto",
      "current": 44,
      "visits": 20133,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "recepcao_infantil",
      "label": "Aguardando triagem infantil",
      "current": 0,
      "visits": 9,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "triagem_adulto",
      "label": "Triagem adulto",
      "current": 53,
      "visits": 7429,
      "avgLeadMinutes": 20.5,
      "totalLeadMinutes": 152149,
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
      "current": 19,
      "visits": 2398,
      "avgLeadMinutes": 35.8,
      "totalLeadMinutes": 85913,
      "isFinal": false
    },
    {
      "id": "consultorio_adulto_2",
      "label": "Consultório adulto 2",
      "current": 24,
      "visits": 819,
      "avgLeadMinutes": 36.2,
      "totalLeadMinutes": 29672,
      "isFinal": false
    },
    {
      "id": "consultorio_adulto_3",
      "label": "Consultório adulto 3",
      "current": 11,
      "visits": 2298,
      "avgLeadMinutes": 39.5,
      "totalLeadMinutes": 90769,
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
      "current": 71,
      "visits": 3058,
      "avgLeadMinutes": 93.9,
      "totalLeadMinutes": 287103,
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
      "visits": 2899,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": true
    }
  ],
  "charts": {
    "sex": [
      {
        "label": "Feminino",
        "value": 6888
      },
      {
        "label": "Masculino",
        "value": 5097
      },
      {
        "label": "Não informado",
        "value": 10
      }
    ],
    "ageClass": [
      {
        "label": "Adulto",
        "value": 11988
      },
      {
        "label": "Infantil",
        "value": 7
      }
    ],
    "cities": [
      {
        "label": "Ceará-Mirim",
        "value": 11734
      },
      {
        "label": "Natal",
        "value": 70
      },
      {
        "label": "Ielmo Marinho",
        "value": 44
      },
      {
        "label": "Taipu",
        "value": 19
      },
      {
        "label": "Maxaranguape",
        "value": 18
      },
      {
        "label": "Rio do Fogo",
        "value": 16
      },
      {
        "label": "Outro município",
        "value": 14
      },
      {
        "label": "São Gonçalo do Amarante",
        "value": 13
      },
      {
        "label": "Extremoz",
        "value": 10
      },
      {
        "label": "Pureza",
        "value": 10
      },
      {
        "label": "João Câmara",
        "value": 10
      },
      {
        "label": "Poço Branco",
        "value": 9
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
        "value": 277
      },
      {
        "date": "2026-09-30",
        "value": 274
      },
      {
        "date": "2026-10-01",
        "value": 244
      },
      {
        "date": "2026-10-02",
        "value": 251
      },
      {
        "date": "2026-10-03",
        "value": 243
      },
      {
        "date": "2026-10-04",
        "value": 194
      },
      {
        "date": "2026-10-05",
        "value": 306
      },
      {
        "date": "2026-10-06",
        "value": 281
      },
      {
        "date": "2026-10-07",
        "value": 252
      },
      {
        "date": "2026-10-08",
        "value": 272
      },
      {
        "date": "2026-10-09",
        "value": 255
      },
      {
        "date": "2026-10-10",
        "value": 242
      },
      {
        "date": "2026-10-11",
        "value": 200
      },
      {
        "date": "2026-10-12",
        "value": 219
      },
      {
        "date": "2026-10-13",
        "value": 307
      },
      {
        "date": "2026-10-14",
        "value": 277
      },
      {
        "date": "2026-10-15",
        "value": 284
      },
      {
        "date": "2026-10-16",
        "value": 217
      },
      {
        "date": "2026-10-17",
        "value": 234
      },
      {
        "date": "2026-10-18",
        "value": 223
      },
      {
        "date": "2026-10-19",
        "value": 295
      },
      {
        "date": "2026-10-20",
        "value": 289
      },
      {
        "date": "2026-10-21",
        "value": 267
      },
      {
        "date": "2026-10-22",
        "value": 288
      },
      {
        "date": "2026-10-23",
        "value": 245
      },
      {
        "date": "2026-10-24",
        "value": 271
      },
      {
        "date": "2026-10-25",
        "value": 218
      },
      {
        "date": "2026-10-26",
        "value": 298
      },
      {
        "date": "2026-10-27",
        "value": 322
      },
      {
        "date": "2026-10-28",
        "value": 193
      }
    ],
    "gravity": [
      {
        "id": "prioridade_10",
        "label": "Emergência",
        "targetLabel": "10 min",
        "patients": 1,
        "totalClassified": 292,
        "avgLeadMinutes": 23027.3,
        "avgLeadLabel": "383:47"
      },
      {
        "id": "prioridade_60",
        "label": "Urgente",
        "targetLabel": "60 min",
        "patients": 17,
        "totalClassified": 1126,
        "avgLeadMinutes": 13127.3,
        "avgLeadLabel": "218:47"
      },
      {
        "id": "prioridade_120",
        "label": "Pouco urgente",
        "targetLabel": "120 min",
        "patients": 32,
        "totalClassified": 2977,
        "avgLeadMinutes": 11545.5,
        "avgLeadLabel": "192:26"
      },
      {
        "id": "prioridade_240",
        "label": "Não urgente",
        "targetLabel": "240 min",
        "patients": 74,
        "totalClassified": 2827,
        "avgLeadMinutes": 7053.9,
        "avgLeadLabel": "117:34"
      }
    ],
    "outcomes": [
      {
        "id": "alta_hospitalar",
        "label": "Alta hospitalar",
        "patients": 2715
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
        "value": 93.9,
        "id": "enfermagem",
        "current": 71,
        "visits": 3058
      },
      {
        "label": "Consultório adulto 3",
        "value": 39.5,
        "id": "consultorio_adulto_3",
        "current": 11,
        "visits": 2298
      },
      {
        "label": "Consultório adulto 2",
        "value": 36.2,
        "id": "consultorio_adulto_2",
        "current": 24,
        "visits": 819
      },
      {
        "label": "Consultório adulto 1",
        "value": 35.8,
        "id": "consultorio_adulto_1",
        "current": 19,
        "visits": 2398
      },
      {
        "label": "Triagem adulto",
        "value": 20.5,
        "id": "triagem_adulto",
        "current": 53,
        "visits": 7429
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
      "totalEntries": 19815,
      "stages": [
        {
          "id": "entrada",
          "label": "Entrada registrada",
          "patients": 19815
        },
        {
          "id": "triagem",
          "label": "Triagem registrada",
          "patients": 7081
        },
        {
          "id": "consultorio",
          "label": "Consultório registrado",
          "patients": 5208
        },
        {
          "id": "desfecho",
          "label": "Desfecho registrado",
          "patients": 2708
        }
      ],
      "complete": 835,
      "closedIncomplete": 1873,
      "inProgress": 220,
      "hospitalized": 0,
      "overdue": 16887,
      "nursing": {
        "passages": 2714,
        "integrity": 287,
        "integrityRate": 0.1057,
        "withoutPreviousConsult": 1777,
        "withoutContinuity": 1986
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
      "0ff85763",
      "1bd7159c",
      "1c531fb7",
      "1db74317",
      "1fa8ee71",
      "205b0cab",
      "2312e84f",
      "2471b028",
      "24803e5e",
      "28t@",
      "414005362061",
      "4c1ab276",
      "5bd198e0",
      "656ed973",
      "746be237",
      "7897154490558",
      "7898962331972",
      "7f1e7872",
      "a2d5e5d6",
      "b6d4f613",
      "d77803ba",
      "e29d555e",
      "eaec95de",
      "ec4a574c",
      "ed16c862",
      "f9c79992"
    ],
    "gravidadeSemPacienteCount": 28,
    "etapasRegistroForaSpots": [],
    "qrIdsUnicos": 0,
    "qrDuplicados": 0
  }
};
