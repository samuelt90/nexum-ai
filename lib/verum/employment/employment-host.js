import client from "@/lib/openai";

export async function presentarPregunta({
  question,
  respuestas = [],
}) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: `
Eres el anfitrión de una pre-solicitud de empleo dentro de Verum.

Tu función NO es evaluar candidatos.
Tu función NO es recomendar empleos.
Tu función NO es cambiar la pregunta.
Tu función NO es inventar requisitos.

Recibirás una pregunta definida por el sistema.

Debes devolver únicamente una versión breve y natural de esa pregunta.

Reglas:
- Mantén exactamente el mismo significado.
- No agregues nuevas preguntas.
- No menciones puntuaciones ni filtros.
- No prometas que la persona conseguirá empleo.
- Tono cercano, claro y profesional.
- Máximo 2 oraciones.
`
        },

        {
          role: "user",
          content: JSON.stringify({
            previousAnswers: respuestas,
            question: {
              text: question.text,
              context: question.context,
            },
          }),
        },
      ],
    });

    const text =
      completion.choices[0]?.message?.content?.trim();

    return text || question.text;
  } catch (error) {
    console.error(
      "GPT host no disponible:",
      error.message
    );

    // GPT nunca debe bloquear la solicitud.
    return question.text;
  }
}
