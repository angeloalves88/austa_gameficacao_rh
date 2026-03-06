export const kpiData = {
  economiaEstimada: 12500,
  migracaoTeleconsulta: 35,
  usoConscientePA: 81, // % colaboradores usando processo correto (telemedicina primeiro)
};

export const scoreData = {
  valor: 81,
  meta: 80,
  status: 'Bom',
};

export const paVsTeleconsultaData = [
  { mes: 'Out', PA: 120, Teleconsulta: 45 },
  { mes: 'Nov', PA: 110, Teleconsulta: 58 },
  { mes: 'Dez', PA: 95, Teleconsulta: 72 },
  { mes: 'Jan', PA: 88, Teleconsulta: 85 },
  { mes: 'Fev', PA: 82, Teleconsulta: 92 },
  { mes: 'Mar', PA: 75, Teleconsulta: 98 },
];

export const statusUsoPAData = [
  { name: 'Não usou PA', value: 35, color: '#22c55e' },
  { name: 'Telemedicina → PA', value: 28, color: '#3b82f6' },
  { name: 'Telemedicina sem PA', value: 25, color: '#eab308' },
  { name: 'PA direto', value: 12, color: '#ef4444' },
];

export const colaboradoresAltoUsoPA = 47;

export const departamentos = ['Todos', 'TI', 'Comercial', 'Financeiro', 'RH', 'Operações', 'Administrativo'];

export type StatusUsoPA = 'NaoUsou' | 'TelemedicinaComPA' | 'TelemedicinaSemPA' | 'PADireto';

export const colaboradoresData = [
  { id: '1', nome: 'Ana Carolina Silva', departamento: 'TI', score: 85, ultimoUsoPA: '15/02/2025', statusUsoPA: 'TelemedicinaSemPA' as StatusUsoPA, tendencia: [70, 78, 85] },
  { id: '2', nome: 'Bruno Mendes', departamento: 'Comercial', score: 45, ultimoUsoPA: '28/01/2025', statusUsoPA: 'PADireto' as StatusUsoPA, tendencia: [55, 50, 45] },
  { id: '3', nome: 'Carla Santos', departamento: 'Financeiro', score: 92, ultimoUsoPA: '10/03/2025', statusUsoPA: 'TelemedicinaComPA' as StatusUsoPA, tendencia: [85, 88, 92] },
  { id: '4', nome: 'Diego Oliveira', departamento: 'RH', score: 68, ultimoUsoPA: '-', statusUsoPA: 'NaoUsou' as StatusUsoPA, tendencia: [62, 65, 68] },
  { id: '5', nome: 'Elisa Ferreira', departamento: 'Operações', score: 35, ultimoUsoPA: '20/01/2025', statusUsoPA: 'PADireto' as StatusUsoPA, tendencia: [48, 42, 35] },
  { id: '6', nome: 'Felipe Costa', departamento: 'TI', score: 78, ultimoUsoPA: '12/02/2025', statusUsoPA: 'TelemedicinaSemPA' as StatusUsoPA, tendencia: [72, 75, 78] },
];

export const agendamentosData = [
  { id: 'a1', colaborador: 'Ana Silva', tipo: 'Consulta', data: new Date(2025, 2, 5, 9, 0), status: 'Confirmado' as const },
  { id: 'a2', colaborador: 'Bruno Mendes', tipo: 'Teleconsulta', data: new Date(2025, 2, 5, 10, 30), status: 'Pendente' as const },
  { id: 'a3', colaborador: 'Carla Santos', tipo: 'PA', data: new Date(2025, 2, 5, 14, 0), status: 'No-show' as const },
  { id: 'a4', colaborador: 'Diego Oliveira', tipo: 'PA', data: new Date(2025, 2, 6, 8, 0), status: 'Confirmado' as const },
  { id: 'a5', colaborador: 'Elisa Ferreira', tipo: 'Teleconsulta', data: new Date(2025, 2, 7, 11, 0), status: 'Pendente' as const },
  { id: 'a6', colaborador: 'Maria Lima', tipo: 'Teleconsulta', data: new Date(2025, 2, 5, 15, 0), status: 'No-show' as const },
];

export const notificacoesData = [
  { id: 'n1', data: '05/03/2025', mensagem: 'Use a telemedicina primeiro! Evite idas desnecessárias ao PA e mantenha seus pontos.', audiencia: 47, openRate: 78 },
  { id: 'n2', data: '28/02/2025', mensagem: 'Lembrete: Teleconsulta disponível 24h. Evite idas desnecessárias ao PA.', audiencia: 800, openRate: 65 },
  { id: 'n3', data: '20/02/2025', mensagem: 'Parabéns, você encerrou o mês com 100pts – continue assim nos próximos', audiencia: 120, openRate: 92 },
];

export const configuracaoInicial = {
  pontosIniciais: 100,
  penalidadePADireto: -10,
  metaScoreCorporativo: 80,
  regraNaoUsouPA: 'Não usou o PA no mês: mantém os pontos atuais',
  regraTelemedicinaComPA: 'Telemedicina + orientado a usar PA: mantém 100 pts + desconto na coparticipação (score/100 = % desconto)',
  regraTelemedicinaSemPA: 'Telemedicina sem precisar de PA: mantém pontos, paga coparticipação, desconto em coparticipação futura',
  regraPADireto: 'Beneficiário foi direto no PA: perde 10 pts (sem desconto na coparticipação)',
};
