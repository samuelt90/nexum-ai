export const cvQuestions = [
  // =====================================================
  // DATOS PERSONALES
  // =====================================================

  {
    id: "full_name",
    section: "personal",
    sectionLabel: "Datos personales",

    text: "¿Cómo quieres que aparezca tu nombre en el CV?",
    context: "Escribe tu nombre completo.",

    inputType: "text",
    required: true,
  },

  {
    id: "phone",
    section: "personal",
    sectionLabel: "Datos personales",

    text: "¿Qué número de teléfono quieres usar?",
    context:
      "Será uno de los medios para que puedan contactarte.",

    inputType: "phone",
    required: true,
  },

  {
    id: "email",
    section: "personal",
    sectionLabel: "Datos personales",

    text: "¿Qué correo quieres mostrar?",
    context:
      "Utiliza un correo que revises con frecuencia.",

    inputType: "email",
    required: true,
  },

  {
  id: "location",
  section: "personal",
  sectionLabel: "Datos personales",
  text: "¿Dónde vives?",
  inputType: "location",
  required: true,
},

 // =====================================================
// EXPERIENCIA
// =====================================================
{
  id: "has_experience",
  section: "experience",
  sectionLabel: "Experiencia",
  text: "¿Has trabajado anteriormente?",
  inputType: "single_select",
  required: true,
  options: [
    "Sí, tengo experiencia",
    "No, sería mi primer empleo",
  ],
},
{
  id: "experiences",
  section: "experience",
  sectionLabel: "Experiencia",
  text: "Agrega tu experiencia laboral",
  context:
    "Puedes agregar más de un trabajo. Empieza por el más reciente.",
  inputType: "experience_list",
  required: true,
  onlyIf: {
    questionId: "has_experience",
    value: "Sí, tengo experiencia",
  },
  fields: [
    {
      id: "job_title",
      label: "Puesto",
      placeholder: "Ej. Asesor de servicio",
      required: true,
    },
    {
      id: "company",
      label: "Empresa",
      placeholder: "Nombre de la empresa",
      required: true,
    },
    {
      id: "period",
      label: "Período",
      placeholder: "Ej. Enero 2024 - Marzo 2026",
      required: true,
    },
    {
      id: "tasks",
      label: "¿Qué hacías principalmente?",
      placeholder: "Cuéntalo con tus propias palabras",
      required: true,
      multiline: true,
    },
  ],
},

// =====================================================
// EDUCACIÓN
// =====================================================
{
  id: "education_level",
  section: "education",
  sectionLabel: "Formación",
  text: "¿Cuál es tu nivel académico?",
  inputType: "single_select",
  required: true,
  options: [
    "Básicos en curso",
    "Básicos completos",
    "Diversificado en curso",
    "Diversificado completo",
    "Universidad en curso",
    "Universidad completa",
  ],
},

{
  id: "education_title_diversificado",
  section: "education",
  sectionLabel: "Formación",
  text: "¿Qué carrera o formación cursas o cursaste?",
  inputType: "single_select",
  required: true,
  onlyIf: {
    questionId: "education_level",
    values: [
      "Diversificado en curso",
      "Diversificado completo",
    ],
  },
  options: [
    "Bachillerato en Ciencias y Letras",
    "Bachillerato en Computación",
    "Perito Contador",
    "Secretariado",
    "Otra",
  ],
},

{
  id: "education_title_diversificado_other",
  section: "education",
  sectionLabel: "Formación",
  text: "¿Qué carrera o formación cursas o cursaste?",
  inputType: "text",
  required: true,
  onlyIf: {
    questionId: "education_title_diversificado",
    value: "Otra",
  },
},


{
  id: "education_title_university",
  section: "education",
  sectionLabel: "Formación",
  text: "¿Qué carrera universitaria estudias o estudiaste?",
  inputType: "text",
  required: true,
  onlyIf: {
    questionId: "education_level",
    values: [
      "Universidad en curso",
      "Universidad completa",
    ],
  },
},

{
  id: "education_institution_basic",
  section: "education",
  sectionLabel: "Formación",
  text: "¿En qué centro educativo estudias o estudiaste?",
  inputType: "text",
  required: true,
  onlyIf: {
    questionId: "education_level",
    values: [
      "Básicos en curso",
      "Básicos completos",
    ],
  },
},

{
  id: "education_institution_diversificado",
  section: "education",
  sectionLabel: "Formación",
  text: "¿En qué establecimiento estudias o estudiaste?",
  inputType: "text",
  required: true,
  onlyIf: {
    questionId: "education_level",
    values: [
      "Diversificado en curso",
      "Diversificado completo",
    ],
  },
},

{
  id: "education_institution_university",
  section: "education",
  sectionLabel: "Formación",
  text: "¿En qué universidad estudias o estudiaste?",
  inputType: "text",
  required: true,
  onlyIf: {
    questionId: "education_level",
    values: [
      "Universidad en curso",
      "Universidad completa",
    ],
  },
},

// =====================================================
// HABILIDADES
// =====================================================
{
  id: "skills",
  section: "skills",
  sectionLabel: "Habilidades",
  text: "Elige las habilidades que mejor te representan",
  context:
    "Puedes seleccionar hasta 4. Si no encuentras una, podrás agregarla.",
  inputType: "multi_select",
  required: true,
  minSelections: 1,
  maxSelections: 4,
  allowCustom: true,
  options: [
    "Atención al cliente",
    "Comunicación",
    "Trabajo en equipo",
    "Resolución de problemas",
    "Organización",
    "Ventas",
    "Excel",
    "Manejo de computadora",
    "Redes sociales",
    "Liderazgo",
    "Adaptabilidad",
    "Manejo del tiempo",
  ],
},

// =====================================================
// IDIOMAS
// =====================================================
{
  id: "english_level",
  section: "languages",
  sectionLabel: "Idiomas",
  text: "¿Cómo describirías tu nivel de inglés?",
  inputType: "single_select",
  required: true,
  options: [
    "Avanzado",
    "Intermedio",
    "Básico",
    "No hablo inglés",
  ],
},

// =====================================================
// OBJETIVO LABORAL
// =====================================================
{
  id: "target_role",
  section: "objective",
  sectionLabel: "Objetivo laboral",
  text: "¿Hacia qué tipo de trabajo quieres orientar tu CV?",
  inputType: "single_select",
  required: true,
  options: [
    "Atención al cliente",
    "Call center",
    "Ventas",
    "Soporte técnico",
    "Administración",
    "Otra",
  ],
},

{
  id: "target_role_other",
  section: "objective",
  sectionLabel: "Objetivo laboral",
  text: "¿Qué tipo de trabajo buscas?",
  inputType: "text",
  required: true,
  onlyIf: {
    questionId: "target_role",
    value: "Otra",
  },
},

];

function respuestasAObjeto(respuestas = []) {
  return Object.fromEntries(
    respuestas.map((respuesta) => [
      respuesta.questionId,
      respuesta.value,
    ])
  );
}

function aplicaPregunta(question, data) {
  if (!question.onlyIf) {
    return true;
  }

  const currentValue =
    data[question.onlyIf.questionId];

  if (Array.isArray(question.onlyIf.values)) {
    return question.onlyIf.values.includes(
      currentValue
    );
  }

  return (
    currentValue === question.onlyIf.value
  );
}


function tieneValor(value) {
  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value === "string") {
    return value.trim() !== "";
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length > 0;
  }

  return true;
}

export function obtenerSiguientePreguntaCV(
  respuestas = []
) {
  const data = respuestasAObjeto(respuestas);

  for (const question of cvQuestions) {
    if (!aplicaPregunta(question, data)) {
      continue;
    }

    if (!tieneValor(data[question.id])) {
      return question;
    }
  }

  return null;
}

export function obtenerProgresoCV(respuestas = []) {
  const data = respuestasAObjeto(respuestas);

  const preguntasAplicables = cvQuestions.filter(
    (question) => aplicaPregunta(question, data)
  );

  const answered = preguntasAplicables.filter(
    (question) =>
      tieneValor(data[question.id])
  ).length;

  return {
    answered,
    total: preguntasAplicables.length,
  };
}
