import { renderCV } from "@/lib/renderers/cv_renderizador";
import { construirDatosCV } from "@/lib/verum/cv/cv-data";
import { normalizarCvConGPT } from "@/lib/verum/cv/cv-normalizer";

const AVAILABLE_TEMPLATES = new Set([
  "ats",
  "professional",
  "creative",
]);

export async function POST(req) {
  try {
    const body = await req.json();

    const respuestas = Array.isArray(body?.respuestas)
      ? body.respuestas
      : [];

    const template = body?.template || "ats";

    if (respuestas.length === 0) {
      return Response.json(
        {
          ok: false,
          error: "No hay información para generar el CV.",
        },
        {
          status: 400,
        }
      );
    }

    if (!AVAILABLE_TEMPLATES.has(template)) {
      return Response.json(
        {
          ok: false,
          error:
            "La plantilla seleccionada no está disponible.",
        },
        {
          status: 400,
        }
      );
    }

    const rawData =
      construirDatosCV(respuestas);

    const data =
      await normalizarCvConGPT(rawData);

    const html =
      await renderCV(
        data,
        template
      );

    return Response.json({
      ok: true,
      status: "generated",
      template,
      data,
      html,
    });
  } catch (error) {
    console.error(
      "Error generando CV Verum:",
      error
    );

    return Response.json(
      {
        ok: false,
        error:
          "No fue posible generar el CV.",
        detail: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
