import { renderCV } from "@/lib/renderers/cv_renderizador";
import { construirDatosCV } from "@/lib/verum/cv/cv-data";
import { normalizarCvConGPT } from "../../../../../lib/verum/cv/cv-normalizer";

export async function POST(req) {
  try {
    const body = await req.json();

  const respuestas = Array.isArray(body?.respuestas)
  ? body.respuestas
  : [];

const template =
  body?.template || "ats";
    if (respuestas.length === 0) {
      return new Response(
        "No hay información para generar la vista previa.",
        {
          status: 400,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
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

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error(
      "Error generando preview CV Verum:",
      error
    );

    return new Response(
      "No fue posible generar la vista previa del CV.",
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      }
    );
  }
}
