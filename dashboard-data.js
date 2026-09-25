window.HOMISP_DASHBOARD_DATA = {
  "generatedAt": "2026-09-25T09:29:54",
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
    "totalPacientes": 7598,
    "pacientesSemCpf": 614,
    "totalAtendimentos": 11170,
    "pacientesAtuais": 155,
    "registros": 16690,
    "gravidades": 3311,
    "resolutividade": 1.0,
    "resolutividadeLabel": "100%",
    "mediaLeadMinutos": 33.1,
    "mediaLeadLabel": "00:33",
    "gargaloAtual": "enfermagem",
    "gargaloAtualLabel": "Enfermagem",
    "gargaloAtualTempo": 66.1,
    "gargaloAtualTempoLabel": "66.1 min",
    "permanenciaMediaMinutos": 112.6,
    "permanenciaMediaLabel": "01:53",
    "taxaReingresso": 0.2736,
    "taxaReingressoLabel": "27.4%",
    "mediaPacientesDia": 247.9,
    "mediaPacientesDiaLabel": "247,9",
    "diasComEntrada": 45
  },
  "sectors": [
    {
      "id": "recepcao_adulto",
      "label": "Aguardando triagem adulto",
      "current": 63,
      "visits": 11136,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "recepcao_infantil",
      "label": "Aguardando triagem infantil",
      "current": 0,
      "visits": 7,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": false
    },
    {
      "id": "triagem_adulto",
      "label": "Triagem adulto",
      "current": 35,
      "visits": 3313,
      "avgLeadMinutes": 17.2,
      "totalLeadMinutes": 56959,
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
      "current": 50,
      "visits": 590,
      "avgLeadMinutes": 46.5,
      "totalLeadMinutes": 27463,
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
      "current": 7,
      "visits": 793,
      "avgLeadMinutes": 57.4,
      "totalLeadMinutes": 45547,
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
      "current": 0,
      "visits": 765,
      "avgLeadMinutes": 66.1,
      "totalLeadMinutes": 50571,
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
      "visits": 85,
      "avgLeadMinutes": 0.0,
      "totalLeadMinutes": 0,
      "isFinal": true
    }
  ],
  "charts": {
    "sex": [
      {
        "label": "Feminino",
        "value": 4322
      },
      {
        "label": "Masculino",
        "value": 3268
      },
      {
        "label": "Não informado",
        "value": 8
      }
    ],
    "ageClass": [
      {
        "label": "Adulto",
        "value": 7592
      },
      {
        "label": "Infantil",
        "value": 6
      }
    ],
    "cities": [
      {
        "label": "Ceará-Mirim",
        "value": 7444
      },
      {
        "label": "Natal",
        "value": 45
      },
      {
        "label": "Ielmo Marinho",
        "value": 23
      },
      {
        "label": "Taipu",
        "value": 12
      },
      {
        "label": "Outro município",
        "value": 11
      },
      {
        "label": "Rio do Fogo",
        "value": 10
      },
      {
        "label": "Maxaranguape",
        "value": 8
      },
      {
        "label": "São Gonçalo do Amarante",
        "value": 7
      },
      {
        "label": "Extremoz",
        "value": 6
      },
      {
        "label": "Pureza",
        "value": 5
      },
      {
        "label": "Bento Fernandes",
        "value": 5
      },
      {
        "label": "Parnamirim",
        "value": 4
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
        "value": 67
      }
    ],
    "gravity": [
      {
        "id": "prioridade_10",
        "label": "Emergência",
        "targetLabel": "10 min",
        "patients": 0,
        "totalClassified": 174,
        "avgLeadMinutes": 21.8,
        "avgLeadLabel": "00:22"
      },
      {
        "id": "prioridade_60",
        "label": "Urgente",
        "targetLabel": "60 min",
        "patients": 10,
        "totalClassified": 597,
        "avgLeadMinutes": 18.7,
        "avgLeadLabel": "00:19"
      },
      {
        "id": "prioridade_120",
        "label": "Pouco urgente",
        "targetLabel": "120 min",
        "patients": 22,
        "totalClassified": 1129,
        "avgLeadMinutes": 16.6,
        "avgLeadLabel": "00:17"
      },
      {
        "id": "prioridade_240",
        "label": "Não urgente",
        "targetLabel": "240 min",
        "patients": 22,
        "totalClassified": 1347,
        "avgLeadMinutes": 14.5,
        "avgLeadLabel": "00:15"
      }
    ],
    "outcomes": [
      {
        "id": "alta_hospitalar",
        "label": "Alta hospitalar",
        "patients": 83
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
        "value": 66.1,
        "id": "enfermagem",
        "current": 0,
        "visits": 765
      },
      {
        "label": "Consultório adulto 3",
        "value": 57.4,
        "id": "consultorio_adulto_3",
        "current": 7,
        "visits": 793
      },
      {
        "label": "Consultório adulto 1",
        "value": 46.5,
        "id": "consultorio_adulto_1",
        "current": 50,
        "visits": 590
      },
      {
        "label": "Triagem adulto",
        "value": 17.2,
        "id": "triagem_adulto",
        "current": 35,
        "visits": 3313
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
