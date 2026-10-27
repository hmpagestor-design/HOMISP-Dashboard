window.HOMISP_DASHBOARD_DATA = {
  "generatedAt": "2026-10-27T14:51:05",
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
    "totalPacientes": 11841,
    "pacientesSemCpf": 1019,
    "totalAtendimentos": 19852,
    "pacientesAtuais": 216,
    "registros": 38093,
    "gravidades": 7190,
    "resolutividade": 1.0,
    "resolutividadeLabel": "100%",
    "mediaLeadMinutos": 38.1,
    "mediaLeadLabel": "00:38",
    "gargaloAtual": "enfermagem",
    "gargaloAtualLabel": "Enfermagem",
    "gargaloAtualTempo": 94.9,
    "gargaloAtualTempoLabel": "94.9 min",
    "permanenciaMediaMinutos": 198196.8,
    "permanenciaMediaLabel": "3303:17",
    "taxaReingresso": 0.3246,
    "taxaReingressoLabel": "32.5%",
    "mediaPacientesDia": 253.1,
    "mediaPacientesDiaLabel": "253,1",
    "diasComEntrada": 77
  },
  "sectors": [
    {
      "id": "recepcao_adulto",
      "label": "Aguardando triagem adulto",
      "current": 55,
      "visits": 19808,
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
      "current": 25,
      "visits": 7193,
      "avgLeadMinutes": 15.8,
      "totalLeadMinutes": 114005,
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
      "current": 0,
      "visits": 2337,
      "avgLeadMinutes": 35.8,
      "totalLeadMinutes": 83557,
      "isFinal": false
    },
    {
      "id": "consultorio_adulto_2",
      "label": "Consultório adulto 2",
      "current": 22,
      "visits": 764,
      "avgLeadMinutes": 32.9,
      "totalLeadMinutes": 25157,
      "isFinal": false
    },
    {
      "id": "consultorio_adulto_3",
      "label": "Consultório adulto 3",
      "current": 30,
      "visits": 2274,
      "avgLeadMinutes": 39.8,
      "totalLeadMinutes": 90431,
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
      "current": 84,
      "visits": 2907,
      "avgLeadMinutes": 94.9,
      "totalLeadMinutes": 275815,
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
      "visits": 2798,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": true
    }
  ],
  "charts": {
    "sex": [
      {
        "label": "Feminino",
        "value": 6792
      },
      {
        "label": "Masculino",
        "value": 5039
      },
      {
        "label": "Não informado",
        "value": 10
      }
    ],
    "ageClass": [
      {
        "label": "Adulto",
        "value": 11834
      },
      {
        "label": "Infantil",
        "value": 7
      }
    ],
    "cities": [
      {
        "label": "Ceará-Mirim",
        "value": 11583
      },
      {
        "label": "Natal",
        "value": 69
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
        "value": 17
      },
      {
        "label": "Rio do Fogo",
        "value": 16
      },
      {
        "label": "São Gonçalo do Amarante",
        "value": 13
      },
      {
        "label": "Outro município",
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
        "value": 190
      }
    ],
    "gravity": [
      {
        "id": "prioridade_10",
        "label": "Emergência",
        "targetLabel": "10 min",
        "patients": 1,
        "totalClassified": 289,
        "avgLeadMinutes": 23370.7,
        "avgLeadLabel": "389:31"
      },
      {
        "id": "prioridade_60",
        "label": "Urgente",
        "targetLabel": "60 min",
        "patients": 0,
        "totalClassified": 1102,
        "avgLeadMinutes": 13449.9,
        "avgLeadLabel": "224:10"
      },
      {
        "id": "prioridade_120",
        "label": "Pouco urgente",
        "targetLabel": "120 min",
        "patients": 11,
        "totalClassified": 2912,
        "avgLeadMinutes": 11849.3,
        "avgLeadLabel": "197:29"
      },
      {
        "id": "prioridade_240",
        "label": "Não urgente",
        "targetLabel": "240 min",
        "patients": 55,
        "totalClassified": 2706,
        "avgLeadMinutes": 7430.2,
        "avgLeadLabel": "123:50"
      }
    ],
    "outcomes": [
      {
        "id": "alta_hospitalar",
        "label": "Alta hospitalar",
        "patients": 2617
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
        "value": 94.9,
        "id": "enfermagem",
        "current": 84,
        "visits": 2907
      },
      {
        "label": "Consultório adulto 3",
        "value": 39.8,
        "id": "consultorio_adulto_3",
        "current": 30,
        "visits": 2274
      },
      {
        "label": "Consultório adulto 1",
        "value": 35.8,
        "id": "consultorio_adulto_1",
        "current": 0,
        "visits": 2337
      },
      {
        "label": "Consultório adulto 2",
        "value": 32.9,
        "id": "consultorio_adulto_2",
        "current": 22,
        "visits": 764
      },
      {
        "label": "Triagem adulto",
        "value": 15.8,
        "id": "triagem_adulto",
        "current": 25,
        "visits": 7193
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
      "totalEntries": 19490,
      "stages": [
        {
          "id": "entrada",
          "label": "Entrada registrada",
          "patients": 19490
        },
        {
          "id": "triagem",
          "label": "Triagem registrada",
          "patients": 6883
        },
        {
          "id": "consultorio",
          "label": "Consultório registrado",
          "patients": 5094
        },
        {
          "id": "desfecho",
          "label": "Desfecho registrado",
          "patients": 2610
        }
      ],
      "complete": 804,
      "closedIncomplete": 1806,
      "inProgress": 194,
      "hospitalized": 0,
      "overdue": 16686,
      "nursing": {
        "passages": 2585,
        "integrity": 277,
        "integrityRate": 0.1072,
        "withoutPreviousConsult": 1682,
        "withoutContinuity": 1898
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
