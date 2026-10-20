function respuestasAObjeto(respuestas = []) {
  return Object.fromEntries(
    respuestas.map((respuesta) => [
      respuesta.questionId,
      respuesta.value,
    ])
  );
}

const RESPUESTAS_INVALIDAS = new Set([
  "no",
  "ninguno",
  "ninguna",
  "no aplica",
  "n/a",
  "na",
  "-",
]);

function limpiarTexto(value) {
  if (typeof value !== "string") {
    return "";
  }

  const texto = value.trim();

  if (!texto) {
    return "";
  }

  if (
    RESPUESTAS_INVALIDAS.has(
      texto.toLowerCase()
    )
  ) {
    return "";
  }

  return texto;
}

function dividirTareas(value) {
  const texto = limpiarTexto(value);

  if (!texto) {
    return [];
  }

  return texto
    .split(/\n|[.;]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const textoNormalizado =
        item.charAt(0).toUpperCase() +
        item.slice(1);

      return textoNormalizado.endsWith(".")
        ? textoNormalizado
        : `${textoNormalizado}.`;
    });
}

function construirUbicacion(value) {
  if (!value) {
    return {
      municipio: "",
      departamento: "",
      direccion: "",
    };
  }

  if (typeof value === "string") {
    return {
      municipio: limpiarTexto(value),
      departamento: "",
      direccion: "",
    };
  }

  if (typeof value !== "object") {
    return {
      municipio: "",
      departamento: "",
      direccion: "",
    };
  }

  return {
    municipio: limpiarTexto(
      value.municipality
    ),

    departamento: limpiarTexto(
      value.department
    ),

    direccion: limpiarTexto(
      value.address
    ),
  };
}

function formatearUbicacion(value) {
  const ubicacion =
    construirUbicacion(value);

  return [
    ubicacion.direccion,
    ubicacion.municipio,
    ubicacion.departamento,
  ]
    .filter(Boolean)
    .join(", ");
}

function construirExperiencias(
  experiences = []
) {
  if (!Array.isArray(experiences)) {
    return [];
  }

  return experiences
    .map((experience) => {
      const puesto = limpiarTexto(
        experience.job_title
      );

      const empresa = limpiarTexto(
        experience.company
      );

      const periodo = limpiarTexto(
        experience.period
      );

      const descripcion = dividirTareas(
        experience.tasks
      );

      return {
        puesto,
        empresa,
        periodo,
        descripcion,
      };
    })
    .filter(
      (experience) =>
        experience.puesto ||
        experience.empresa ||
        experience.periodo ||
        experience.descripcion.length > 0
    );
}

function obtenerTituloEducacion(data) {
  const nivel =
    limpiarTexto(data.education_level);

  if (
    nivel === "Diversificado en curso" ||
    nivel === "Diversificado completo"
  ) {
    const seleccion = limpiarTexto(
      data.education_title_diversificado
    );

    if (seleccion === "Otra") {
      return limpiarTexto(
        data.education_title_diversificado_other
      );
    }

    return seleccion;
  }

  if (
    nivel === "Universidad en curso" ||
    nivel === "Universidad completa"
  ) {
    return limpiarTexto(
      data.education_title_university
    );
  }

  return "";
}

function obtenerInstitucionEducacion(data) {
  const nivel =
    limpiarTexto(data.education_level);

  if (
    nivel === "Básicos en curso" ||
    nivel === "Básicos completos"
  ) {
    return limpiarTexto(
      data.education_institution_basic
    );
  }

  if (
    nivel === "Diversificado en curso" ||
    nivel === "Diversificado completo"
  ) {
    return limpiarTexto(
      data.education_institution_diversificado
    );
  }

  if (
    nivel === "Universidad en curso" ||
    nivel === "Universidad completa"
  ) {
    return limpiarTexto(
      data.education_institution_university
    );
  }

  return "";
}

function construirEducacion(data) {
  const nivel =
    limpiarTexto(data.education_level);

  const titulo =
    obtenerTituloEducacion(data);

  const institucion =
    obtenerInstitucionEducacion(data);

  if (
    !nivel &&
    !titulo &&
    !institucion
  ) {
    return [];
  }

  return [
    {
      nivel,
      titulo,
      institucion,
    },
  ];
}

function construirHabilidades(
  skills = []
) {
  if (!Array.isArray(skills)) {
    return [];
  }

  return skills
    .map((skill) =>
      limpiarTexto(skill)
    )
    .filter(Boolean)
    .map((skill) => ({
      nombre: skill,
    }));
}

function construirIdiomas(
  englishLevel = ""
) {
  const nivel =
    limpiarTexto(englishLevel);

  if (
    !nivel ||
    nivel === "No hablo inglés"
  ) {
    return [];
  }

  return [
    {
      idioma: "Inglés",
      nivel,
    },
  ];
}

function obtenerPuestoObjetivo(data) {
  const seleccion =
    limpiarTexto(data.target_role);

  if (seleccion === "Otra") {
    return limpiarTexto(
      data.target_role_other
    );
  }

  return seleccion;
}

function construirPerfil(
  puestoObjetivo,
  tieneExperiencia,
  habilidades = []
) {
  const objetivo =
    puestoObjetivo ||
    "nuevas oportunidades laborales";

  const nombresHabilidades = Array.isArray(
    habilidades
  )
    ? habilidades
        .map((habilidad) =>
          limpiarTexto(habilidad)
        )
        .filter(Boolean)
        .slice(0, 3)
    : [];

  let habilidadesTexto = "";

  if (
    nombresHabilidades.length === 1
  ) {
    habilidadesTexto =
      nombresHabilidades[0];
  }

  if (
    nombresHabilidades.length === 2
  ) {
    habilidadesTexto =
      `${nombresHabilidades[0]} y ${nombresHabilidades[1]}`;
  }

  if (
    nombresHabilidades.length >= 3
  ) {
    habilidadesTexto =
      `${nombresHabilidades[0]}, ${nombresHabilidades[1]} y ${nombresHabilidades[2]}`;
  }

  if (tieneExperiencia) {
    if (habilidadesTexto) {
      return (
        `Profesional orientado al área de ${objetivo}, ` +
        `con experiencia laboral y habilidades en ${habilidadesTexto}.`
      );
    }

    return (
      `Profesional orientado al área de ${objetivo}, ` +
      `con experiencia laboral y enfoque en el desarrollo profesional.`
    );
  }

  if (habilidadesTexto) {
    return (
      `Persona orientada al área de ${objetivo}, ` +
      `con habilidades en ${habilidadesTexto} y disposición para desarrollarse profesionalmente.`
    );
  }

  return (
    `Persona orientada al área de ${objetivo}, ` +
    `con disposición para aprender y desarrollarse profesionalmente.`
  );
}

export function construirDatosCV(
  respuestas = []
) {
  const data =
    respuestasAObjeto(respuestas);

  const tieneExperiencia =
    data.has_experience ===
    "Sí, tengo experiencia";

  const puestoObjetivo =
    obtenerPuestoObjetivo(data);

  const habilidades =
    construirHabilidades(
      data.skills
    );

  return {
    nombre:
      limpiarTexto(data.full_name),

    profesion:
      puestoObjetivo,

    contacto: {
      telefono:
        limpiarTexto(data.phone),

      email:
        limpiarTexto(data.email),

      ubicacion:
        formatearUbicacion(
          data.location
        ),

      web: "",
    },

    perfil:
      construirPerfil(
        puestoObjetivo,
        tieneExperiencia,
        data.skills
      ),

    experiencia:
      tieneExperiencia
        ? construirExperiencias(
            data.experiences
          )
        : [],

    educacion:
      construirEducacion(data),

    habilidades,

    idiomas:
      construirIdiomas(
        data.english_level
      ),

    certificaciones: [],
  };
}
