import {
  obtenerProgresoCV,
  obtenerSiguientePreguntaCV,
} from "@/lib/verum/cv/cv-questions";

export async function POST(req) {
  try {
    const body = await req.json();

    const respuestas = Array.isArray(body?.respuestas)
      ? body.respuestas
      : [];

    const progress = obtenerProgresoCV(respuestas);

    const siguientePregunta =
      obtenerSiguientePreguntaCV(respuestas);

    // =====================================================
    // TODAVÍA FALTA INFORMACIÓN
    // =====================================================

    if (siguientePregunta) {
      return Response.json({
        ok: true,
        status: "question",

        progress,

        question: {
          id: siguientePregunta.id,

          section: siguientePregunta.section,
          sectionLabel:
            siguientePregunta.sectionLabel,

          text: siguientePregunta.text,
          context:
            siguientePregunta.context || "",

          inputType:
            siguientePregunta.inputType,

          required:
            siguientePregunta.required,

          options:
            siguientePregunta.options || null,

          minSelections:
            siguientePregunta.minSelections || null,

          maxSelections:
            siguientePregunta.maxSelections || null,

          allowCustom:
            siguientePregunta.allowCustom || false,

          fields:
            siguientePregunta.fields || null,
        },
      });
    }

    // =====================================================
    // INFORMACIÓN COMPLETA
    // NO GENERAMOS EL CV TODAVÍA
    // =====================================================

    return Response.json({
      ok: true,
      status: "ready",

      progress,

      canGenerate: true,
      missingRequired: [],

      respuestas,
    });
  } catch (error) {
    console.error(
      "Error en flujo CV Verum:",
      error
    );

    return Response.json(
      {
        ok: false,
        error:
          "No fue posible procesar la información del CV.",
        detail: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
