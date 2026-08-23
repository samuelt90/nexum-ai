import client from "@/lib/openai";

export async function organizarCV(data) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Recibes un JSON de un CV.

Tu tarea es organizar la experiencia laboral.

Reglas:
- NO cambies la estructura del JSON
- NO agregues campos nuevos
- NO elimines campos existentes
- NO inventes información

Puedes:
- Ordenar experiencias de más reciente a más antigua
- Eliminar duplicados exactos
- Mejorar claridad si hay redundancia

NO debes:
- Calcular años
- Modificar habilidades
- Modificar educación
- Modificar contacto

Responde SOLO en JSON válido
`
        },
        {
          role: "user",
          content: JSON.stringify(data)
        }
      ],
    });

    const texto = completion.choices[0].message.content;
    const organizado = JSON.parse(texto);

    // 🔵 PROTECCIÓN DE ESTRUCTURA
    return {
      nombre: organizado.nombre || data.nombre,
      profesion: organizado.profesion || data.profesion,
      contacto: organizado.contacto || data.contacto,
      experiencia: Array.isArray(organizado.experiencia)
        ? organizado.experiencia
        : data.experiencia,
      educacion: Array.isArray(organizado.educacion)
        ? organizado.educacion
        : data.educacion,
      habilidades: Array.isArray(organizado.habilidades)
        ? organizado.habilidades
        : data.habilidades,
      perfil: organizado.perfil || data.perfil
    };

  } catch (e) {
    // 🔴 fallback seguro
    return data;
  }
}
