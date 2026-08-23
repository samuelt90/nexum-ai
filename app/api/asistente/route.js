import { renderCV } from "@/lib/renderers/cv_renderizador";
import { generarCV } from "@/lib/skills/cv";
import { normalizarCV } from "@/lib/skills/cv_normalizador";
import { organizarCV } from "@/lib/skills/cv_organizador";
import { mejorarCV } from "@/lib/skills/cv_mejorador";
import { validarCV } from "@/lib/skills/cv_validador";

// 🔵 GET → para ver en navegador (debug completo)
export async function GET() {
  try {
    const input = "Soy Samuel Torres, ingeniero en sistemas con experiencia en desarrollo de software. Mi número es 502 5555 5555, mi correo es samuel.torres@email.com, vivo en Villa Nueva, Guatemala y mi sitio web es www.samueltores.dev. Trabajé como asesor de ventas en Tienda XYZ de 2021 a 2024, donde atendía clientes, cerraba ventas y manejaba caja. También trabajé como desarrollador backend en Tech Solutions desde 2024 hasta la actualidad, donde desarrollo APIs, optimizo bases de datos y automatizo procesos. Estudié Ingeniería en Sistemas en la Universidad de San Carlos de Guatemala del 2018 al 2022 y tengo un diplomado en desarrollo web en 2023. Tengo habilidades en JavaScript, Node.js y automatización.";

    let data = await generarCV(input);

    data = normalizarCV(data);
    data = await organizarCV(data);
    data = await mejorarCV(data);

    const validacion = validarCV(data);

    console.log("DATA FINAL:", JSON.stringify(data, null, 2));
    console.log("VALIDACIÓN:", validacion);

    const html = await renderCV(data);

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html" }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

// 🔵 POST → flujo real con Thunder
export async function POST(req) {
  try {
    const { input } = await req.json();

    let data = await generarCV(input);

    data = normalizarCV(data);
    data = await organizarCV(data);
    data = await mejorarCV(data);

    const validacion = validarCV(data);

    console.log("VALIDACIÓN:", validacion);

    const html = await renderCV(data);

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html" }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
