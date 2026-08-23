import client from "@/lib/openai";

export async function mejorarCV(data) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Recibes un JSON de un CV y debes mejorar la redacción.

Reglas:
- NO cambies la estructura
- NO elimines campos
- NO agregues nuevos campos
- NO inventes información
- Mejora redacción de:
  - perfil
  - descripcion de experiencia
  - titulos si aplica
- Usa lenguaje profesional y claro
- Mantén coherencia en español
- Responde SOLO en JSON válido
`
        },
        {
          role: "user",
          content: JSON.stringify(data)
        }
      ],
    });

    const texto = completion.choices[0].message.content;

    const mejorado = JSON.parse(texto);

    // 🔵 VALIDACIÓN DE SEGURIDAD (NO romper estructura)
    return {
      nombre: mejorado.nombre || data.nombre,
      profesion: mejorado.profesion || data.profesion,
      contacto: mejorado.contacto || data.contacto,
      experiencia: Array.isArray(mejorado.experiencia)
        ? mejorado.experiencia
        : data.experiencia,
      educacion: Array.isArray(mejorado.educacion)
        ? mejorado.educacion
        : data.educacion,
      habilidades: Array.isArray(mejorado.habilidades)
        ? mejorado.habilidades
        : data.habilidades,
      perfil: mejorado.perfil || data.perfil
    };

  } catch (e) {
    // 🔴 fallback → si GPT falla, no rompe nada
    return data;
  }
}
