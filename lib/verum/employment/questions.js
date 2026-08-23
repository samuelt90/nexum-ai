export const employmentQuestions = [
  {
    id: "english",
    text: "¿Cómo describirías tu nivel de inglés?",
    context:
      "Piensa en qué tan cómodo te sentirías conversando con un cliente en inglés.",
    options: [
      "Avanzado",
      "Intermedio",
      "Básico",
      "No estoy seguro",
    ],
  },

  {
    id: "customer_service",
    text: "¿Has trabajado atendiendo clientes?",
    context:
      "Puede ser presencial, por llamada, chat, ventas o redes sociales.",
    options: [
      "Sí, tengo experiencia",
      "He tenido algo de experiencia",
      "Sería mi primer empleo",
    ],
  },

  {
    id: "phone_calls",
    text: "¿Te sentirías cómodo atendiendo clientes por llamada?",
    context: "",
    options: [
      "Sí, sin problema",
      "Podría hacerlo",
      "Prefiero evitar llamadas",
    ],
  },

  {
    id: "chat_support",
    text: "¿Te sentirías cómodo atendiendo clientes por chat?",
    context:
      "Algunas plazas requieren manejar varias conversaciones escritas.",
    options: [
      "Sí",
      "Sí, incluso varias conversaciones",
      "Prefiero llamadas",
      "No estoy seguro",
    ],
  },

  {
    id: "technical",
    text: "¿Qué tan cómodo te sientes resolviendo problemas técnicos básicos?",
    context:
      "Por ejemplo: internet, aplicaciones, computadoras o dispositivos.",
    options: [
      "Tengo experiencia",
      "Puedo aprender y resolver problemas básicos",
      "No es mi área",
    ],
  },

  {
    id: "sales",
    text: "¿Te interesaría trabajar con ventas y metas?",
    context:
      "Algunas oportunidades incluyen objetivos comerciales o comisiones.",
    options: [
      "Sí, me interesa",
      "Podría considerarlo",
      "Prefiero servicio al cliente o soporte",
    ],
  },

  {
    id: "difficult_customers",
    text:
      "¿Cómo te sentirías atendiendo clientes molestos o que quieren cancelar un servicio?",
    context: "",
    options: [
      "Tengo experiencia con este tipo de situaciones",
      "Podría manejarlo",
      "Preferiría otro tipo de atención",
    ],
  },

  {
    id: "schedule",
    text: "¿Qué disponibilidad de horario tienes?",
    context: "",
    options: [
      "Horario diurno",
      "Horario nocturno",
      "Turnos rotativos",
      "Tengo disponibilidad completa",
    ],
  },

  {
    id: "location",
    text: "¿Dónde podrías trabajar?",
    context: "",
    options: [
      "Ciudad de Guatemala",
      "Mixco",
      "Me interesa trabajo remoto",
      "Puedo movilizarme",
    ],
  },
];

export function obtenerSiguientePregunta(respuestas = []) {
  const respondidas = new Set(
    respuestas.map((respuesta) => respuesta.questionId)
  );

  return (
    employmentQuestions.find(
      (pregunta) => !respondidas.has(pregunta.id)
    ) || null
  );
}
