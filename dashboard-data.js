window.HOMISP_DASHBOARD_DATA = {
  "generatedAt": "2026-09-09T10:21:52",
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
    "fallbackErrors": []
  },
  "notes": [
    "Etapas normalizadas com lower-case, underscore e remocao geral de acentos.",
    "Saidas finais tratadas como alta_hospitalar, obito e transferencia.",
    "Perfil demografico e total de pacientes deduplicados por CPF normalizado.",
    "Dados pessoais de pacientes nao foram exportados para este dashboard."
  ],
  "kpis": {
    "totalPacientes": 5163,
    "pacientesSemCpf": 416,
    "totalAtendimentos": 7101,
    "pacientesAtuais": 7113,
    "registros": 11507,
    "gravidades": 2702,
    "resolutividade": 0,
    "resolutividadeLabel": "0%",
    "mediaLeadMinutos": 32.3,
    "mediaLeadLabel": "00:32",
    "gargaloAtual": "enfermagem",
    "gargaloAtualLabel": "Enfermagem",
    "gargaloAtualTempo": 68.6,
    "gargaloAtualTempoLabel": "68.6 min",
    "permanenciaMediaMinutos": 0,
    "permanenciaMediaLabel": "00:00",
    "taxaReingresso": 0.2277,
    "taxaReingressoLabel": "22.8%",
    "mediaPacientesDia": 244.7,
    "mediaPacientesDiaLabel": "244,7",
    "diasComEntrada": 29
  },
  "sectors": [
    {
      "id": "recepcao_adulto",
      "label": "Aguardando triagem adulto",
      "current": 3760,
      "visits": 7068,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "recepcao_infantil",
      "label": "Aguardando triagem infantil",
      "current": 4,
      "visits": 6,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "triagem_adulto",
      "label": "Triagem adulto",
      "current": 1882,
      "visits": 2704,
      "avgLeadMinutes": 15.0,
      "totalLeadMinutes": 40455,
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
      "current": 328,
      "visits": 401,
      "avgLeadMinutes": 46.6,
      "totalLeadMinutes": 18683,
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
      "current": 512,
      "visits": 603,
      "avgLeadMinutes": 57.3,
      "totalLeadMinutes": 34525,
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
      "current": 627,
      "visits": 724,
      "avgLeadMinutes": 68.6,
      "totalLeadMinutes": 49666,
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
      "visits": 0,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": true
    }
  ],
  "charts": {
    "sex": [
      {
        "label": "Feminino",
        "value": 2939
      },
      {
        "label": "Masculino",
        "value": 2218
      },
      {
        "label": "Não informado",
        "value": 6
      }
    ],
    "ageClass": [
      {
        "label": "Adulto",
        "value": 5158
      },
      {
        "label": "Infantil",
        "value": 5
      }
    ],
    "cities": [
      {
        "label": "Ceará-Mirim",
        "value": 5058
      },
      {
        "label": "Natal",
        "value": 34
      },
      {
        "label": "Ielmo Marinho",
        "value": 14
      },
      {
        "label": "Taipu",
        "value": 11
      },
      {
        "label": "Outro município",
        "value": 10
      },
      {
        "label": "São Gonçalo do Amarante",
        "value": 6
      },
      {
        "label": "Maxaranguape",
        "value": 5
      },
      {
        "label": "Rio do Fogo",
        "value": 5
      },
      {
        "label": "Bento Fernandes",
        "value": 3
      },
      {
        "label": "Extremoz",
        "value": 3
      },
      {
        "label": "João Câmara",
        "value": 3
      },
      {
        "label": "Parnamirim",
        "value": 3
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
        "value": 1
      }
    ],
    "gravity": [
      {
        "id": "prioridade_10",
        "label": "Emergência",
        "targetLabel": "10 min",
        "patients": 165,
        "totalClassified": 165,
        "avgLeadMinutes": 22.2,
        "avgLeadLabel": "00:22"
      },
      {
        "id": "prioridade_60",
        "label": "Urgente",
        "targetLabel": "60 min",
        "patients": 516,
        "totalClassified": 516,
        "avgLeadMinutes": 16.4,
        "avgLeadLabel": "00:16"
      },
      {
        "id": "prioridade_120",
        "label": "Pouco urgente",
        "targetLabel": "120 min",
        "patients": 936,
        "totalClassified": 936,
        "avgLeadMinutes": 16.9,
        "avgLeadLabel": "00:17"
      },
      {
        "id": "prioridade_240",
        "label": "Não urgente",
        "targetLabel": "240 min",
        "patients": 1030,
        "totalClassified": 1030,
        "avgLeadMinutes": 13.6,
        "avgLeadLabel": "00:14"
      }
    ],
    "outcomes": [
      {
        "id": "alta_hospitalar",
        "label": "Alta hospitalar",
        "patients": 0
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
        "value": 68.6,
        "id": "enfermagem",
        "current": 627,
        "visits": 724
      },
      {
        "label": "Consultório adulto 3",
        "value": 57.3,
        "id": "consultorio_adulto_3",
        "current": 512,
        "visits": 603
      },
      {
        "label": "Consultório adulto 1",
        "value": 46.6,
        "id": "consultorio_adulto_1",
        "current": 328,
        "visits": 401
      },
      {
        "label": "Triagem adulto",
        "value": 15.0,
        "id": "triagem_adulto",
        "current": 1882,
        "visits": 2704
      },
      {
        "label": "Internação",
        "value": 1.0,
        "id": "internacao",
        "current": 0,
        "visits": 1
      }
    ]
  },
  "quality": {
    "registrosSemPaciente": [
      "010404011441",
      "0279736b",
      "044a8dc6",
      "06402266",
      "09695b2e",
      "1c531fb7",
      "1db74317",
      "205b0cab",
      "24803e5e",
      "656ed973",
      "746be237",
      "7897154490558",
      "d77803ba",
      "e29d555e",
      "ed16c862",
      "f9c79992"
    ],
    "gravidadeSemPacienteCount": 16,
    "etapasRegistroForaSpots": [],
    "qrIdsUnicos": 0,
    "qrDuplicados": 0
  }
};
