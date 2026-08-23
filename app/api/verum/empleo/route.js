import {
  evaluarCompatibilidad,
} from "@/lib/verum/employment/employment-agent";

import {
  obtenerSiguientePregunta,
} from "@/lib/verum/employment/questions";

import {
  presentarPregunta,
} from "@/lib/verum/employment/employment-host";

export async function POST(req) {
  try {
    const body = await req.json();

    const respuestas = Array.isArray(body.respuestas)
      ? body.respuestas
      : [];

    // --------------------------------------------
    // TODAVÍA FALTA INFORMACIÓN
    // --------------------------------------------

    const siguientePregunta =
      obtenerSiguientePregunta(respuestas);

    if (siguientePregunta) {
      const message = await presentarPregunta({
        question: siguientePregunta,
        respuestas,
      });

      return Response.json({
        ok: true,
        status: "question",

        progress: {
          answered: respuestas.length,
          total: 9,
        },

        question: {
          id: siguientePregunta.id,
          text: siguientePregunta.text,
          message,
          context: siguientePregunta.context,
          options: siguientePregunta.options,
        },
      });
    }

    // --------------------------------------------
    // YA TENEMOS TODAS LAS RESPUESTAS
    // --------------------------------------------

    const resultado =
      evaluarCompatibilidad(respuestas);

    const matches = resultado.matches.filter(
      (match) => match.fit !== "low"
    );

    return Response.json({
      ok: true,
      status: "results",
      totalMatches: matches.length,
      profile: resultado.profile,
      matches,
    });
  } catch (error) {
    console.error(
      "Error en pre-solicitud Verum:",
      error
    );

    return Response.json(
      {
        ok: false,
        error:
          "No fue posible procesar la pre-solicitud.",
        detail: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
