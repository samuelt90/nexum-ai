import { callCenterJobs } from "@/lib/verum/jobs/call-center";

function respuestasAObjeto(respuestas = []) {
  return Object.fromEntries(
    respuestas.map((respuesta) => [
      respuesta.questionId,
      respuesta.value,
    ])
  );
}

function construirPerfil(respuestas) {
  const data = respuestasAObjeto(respuestas);

  const perfil = {
    englishLevel: "unknown",

    skills: new Set(),

    firstJob: false,

    schedule: {
      day: false,
      night: false,
      rotating: false,
      fullAvailability: false,
    },

    location: {
      guatemalaCity: false,
      mixco: false,
      remote: false,
      canTravel: false,
    },
  };

  // ------------------------------------------------
  // INGLÉS
  // ------------------------------------------------

  if (data.english === "Avanzado") {
    perfil.englishLevel = "advanced";

    perfil.skills.add("english_conversation");
    perfil.skills.add("written_english");
  }

  if (data.english === "Intermedio") {
    perfil.englishLevel = "intermediate";

    perfil.skills.add("english_conversation");
    perfil.skills.add("written_english");
  }

  if (data.english === "Básico") {
    perfil.englishLevel = "basic";
  }

  // ------------------------------------------------
  // ATENCIÓN AL CLIENTE
  // ------------------------------------------------

  if (data.customer_service === "Sí, tengo experiencia") {
    perfil.skills.add("customer_service");
    perfil.skills.add("customer_communication");
  }

  if (
    data.customer_service ===
    "He tenido algo de experiencia"
  ) {
    perfil.skills.add("customer_communication");
  }

  if (
    data.customer_service ===
    "Sería mi primer empleo"
  ) {
    perfil.firstJob = true;
  }

  // ------------------------------------------------
  // LLAMADAS
  // ------------------------------------------------

  if (
    data.phone_calls === "Sí, sin problema" ||
    data.phone_calls === "Podría hacerlo"
  ) {
    perfil.skills.add("phone_calls");
    perfil.skills.add("customer_commnucation");
  }

  // ------------------------------------------------
  // CHAT
  // ------------------------------------------------

if (data.chat_support === "Sí") {
  perfil.skills.add("chat_support");
  perfil.skills.add("customer_communication");
}

if (
  data.chat_support ===
  "Sí, incluso varias conversaciones"
) {
  perfil.skills.add("chat_support");
  perfil.skills.add("multitasking");
  perfil.skills.add("customer_communication");
}

  // ------------------------------------------------
  // SOPORTE TÉCNICO
  // ------------------------------------------------

  if (data.technical === "Tengo experiencia") {
    perfil.skills.add("basic_technical_support");
    perfil.skills.add("problem_solving");
    perfil.skills.add("computer_skills");
  }

  if (
    data.technical ===
    "Puedo aprender y resolver problemas básicos"
  ) {
    perfil.skills.add("basic_technical_support");
    perfil.skills.add("problem_solving");
  }

  // ------------------------------------------------
  // VENTAS
  // ------------------------------------------------

  if (data.sales === "Sí, me interesa") {
    perfil.skills.add("sales_interest");
    perfil.skills.add("goal_oriented");
  }

  if (data.sales === "Podría considerarlo") {
    perfil.skills.add("sales_interest");
  }

  // ------------------------------------------------
  // CLIENTES DIFÍCILES
  // ------------------------------------------------

  if (
    data.difficult_customers ===
    "Tengo experiencia con este tipo de situaciones"
  ) {
    perfil.skills.add("difficult_customers");
    perfil.skills.add("objection_handling");
  }

  if (
    data.difficult_customers ===
    "Podría manejarlo"
  ) {
    perfil.skills.add("difficult_customers");
  }

  // ------------------------------------------------
  // HORARIO
  // ------------------------------------------------

  if (data.schedule === "Horario diurno") {
    perfil.schedule.day = true;
  }

  if (data.schedule === "Horario nocturno") {
    perfil.schedule.night = true;
  }

  if (data.schedule === "Turnos rotativos") {
    perfil.schedule.rotating = true;
  }

  if (
    data.schedule ===
    "Tengo disponibilidad completa"
  ) {
    perfil.schedule.day = true;
    perfil.schedule.night = true;
    perfil.schedule.rotating = true;
    perfil.schedule.fullAvailability = true;
  }

  // ------------------------------------------------
  // UBICACIÓN
  // ------------------------------------------------

  if (
    data.location === "Ciudad de Guatemala"
  ) {
    perfil.location.guatemalaCity = true;
  }

  if (data.location === "Mixco") {
    perfil.location.mixco = true;
  }

  if (
    data.location ===
    "Me interesa trabajo remoto"
  ) {
    perfil.location.remote = true;
  }

  if (data.location === "Puedo movilizarme") {
    perfil.location.guatemalaCity = true;
    perfil.location.mixco = true;
    perfil.location.canTravel = true;
  }

  return perfil;
}

function evaluarIngles(job, perfil) {
  if (job.minimumEnglishLevel !== "B2") {
    return {
      valid: true,
      score: 0,
    };
  }

  if (perfil.englishLevel === "advanced") {
    return {
      valid: true,
      score: 25,
    };
  }

  if (perfil.englishLevel === "intermediate") {
    return {
      valid: true,
      score: 18,
    };
  }

  return {
    valid: false,
    score: 0,
  };
}

function evaluarUbicacion(job, perfil) {
  // El candidato indicó trabajo remoto.
  if (
    perfil.location.remote &&
    job.modality !== "Remoto"
  ) {
    return {
      valid: false,
      score: 0,
    };
  }

  // Plaza remota.
  if (job.modality === "Remoto") {
    return {
      valid: true,
      score: perfil.location.remote ? 10 : 5,
    };
  }

  // Ciudad de Guatemala.
  if (
    job.location === "Ciudad de Guatemala" &&
    (
      perfil.location.guatemalaCity ||
      perfil.location.canTravel
    )
  ) {
    return {
      valid: true,
      score: 10,
    };
  }

  // Mixco.
  if (
    job.location === "Mixco" &&
    (
      perfil.location.mixco ||
      perfil.location.canTravel
    )
  ) {
    return {
      valid: true,
      score: 10,
    };
  }

  return {
    valid: false,
    score: 0,
  };
}


function evaluarHorario(job, perfil) {
  if (perfil.schedule.fullAvailability) {
    return 10;
  }

  if (
    job.availability.rotatingSchedule &&
    perfil.schedule.rotating
  ) {
    return 10;
  }

  if (
    job.availability.nightSchedule &&
    perfil.schedule.night
  ) {
    return 10;
  }

  if (
    !job.availability.rotatingSchedule &&
    perfil.schedule.day
  ) {
    return 10;
  }

  return 3;
}

function evaluarPlaza(job, perfil) {
  const english = evaluarIngles(job, perfil);

  // Inglés inferior al requerido:
  // no recomendamos la plaza.
  if (!english.valid) {
    return null;
  }

  // Retention no acepta primer empleo.
  if (
    perfil.firstJob &&
    job.acceptsFirstJob === false
  ) {
    return null;
  }

  let score = english.score;

  const requiredMatched = [];
  const requiredMissing = [];
  const preferredMatched = [];

  for (const skill of job.requiredSkills) {
    if (perfil.skills.has(skill)) {
      requiredMatched.push(skill);
      score += 8;
    } else {
      requiredMissing.push(skill);
    }
  }

  for (const skill of job.preferredSkills) {
    if (perfil.skills.has(skill)) {
      preferredMatched.push(skill);
      score += 3;
    }
  }

 const location = evaluarUbicacion(job, perfil);

if (!location.valid) {
  return null;
}

score += location.score;
score += evaluarHorario(job, perfil);

  const requiredRatio =
    job.requiredSkills.length > 0
      ? requiredMatched.length /
        job.requiredSkills.length
      : 1;

  let fit = "possible";

  if (requiredRatio >= 0.8) {
    fit = "strong";
  }

  if (requiredRatio < 0.5) {
    fit = "low";
  }

  return {
    jobId: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    modality: job.modality,
    schedule: job.schedule,

    fit,
    score,

    requiredMatched,
    requiredMissing,
    preferredMatched,
  };
}

function crearRazon(resultado) {
  if (resultado.fit === "strong") {
    return "Tu perfil cumple la mayoría de los requisitos principales de esta plaza.";
  }

  if (resultado.fit === "possible") {
    return "Tienes varias características compatibles y esta plaza podría ser una opción para ti.";
  }

  return "Tu perfil tiene algunos puntos en común, aunque todavía faltan requisitos importantes.";
}

export function evaluarCompatibilidad(
  respuestas = []
) {
  const perfil = construirPerfil(respuestas);

  const resultados = callCenterJobs
    .map((job) => evaluarPlaza(job, perfil))
    .filter(Boolean)
    .map((resultado) => ({
      ...resultado,
      reason: crearRazon(resultado),
    }))
    .sort((a, b) => b.score - a.score);

  return {
    profile: {
      englishLevel: perfil.englishLevel,
      firstJob: perfil.firstJob,
      skills: [...perfil.skills],
      schedule: perfil.schedule,
      location: perfil.location,
    },

    matches: resultados,
  };
}
