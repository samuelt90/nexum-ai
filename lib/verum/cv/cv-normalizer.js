import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function normalizarCvConGPT(data) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn(
      "OPENAI_API_KEY no configurada. Se usará el CV sin normalización GPT."
    );

    return data;
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",

      instructions: `
Eres una capa editorial para currículums profesionales en español.

Tu tarea es NORMALIZAR y MEJORAR LA PRESENTACIÓN del contenido suministrado.

REGLAS OBLIGATORIAS:

1. No inventes información.
2. No agregues experiencia, estudios, habilidades, empresas, fechas ni responsabilidades que no estén presentes.
3. No cambies el significado de los datos.
4. Corrige mayúsculas, minúsculas, puntuación y ortografía.
5. Normaliza nombres propios, empresas e instituciones de forma profesional.
6. Reconoce siglas evidentes y escríbelas correctamente cuando el contexto lo permita.
7. Normaliza períodos laborales:
   "enero 2024 a mayo 2026"
   debe quedar como:
   "Enero 2024 - Mayo 2026".
8. Mejora títulos de puestos solamente cuando sea una corrección lingüística evidente.
   Ejemplo:
   "asesor ventas" → "Asesor de ventas".
9. Las responsabilidades deben quedar como frases profesionales, breves y claras.
10. Puedes corregir:
    "pos" → "POS"
    cuando claramente se refiere al sistema o punto de venta.
11. No conviertas tareas simples en logros inventados.
12. El perfil profesional debe utilizar únicamente datos presentes en el objeto.
13. Conserva exactamente la estructura JSON recibida.
14. No agregues campos nuevos.
15. Devuelve únicamente JSON válido.

Ejemplo de criterio:

Entrada:
{
  "institucion": "CBc el carmen",
  "puesto": "asesor ventas",
  "periodo": "enero 2024 a mayo 2026",
  "descripcion": [
    "caja chica.",
    "pos.",
    "cuadre diario."
  ]
}

Salida editorial válida:
{
  "institucion": "CBC El Carmen",
  "puesto": "Asesor de ventas",
  "periodo": "Enero 2024 - Mayo 2026",
  "descripcion": [
    "Manejo de caja chica.",
    "Uso de sistema POS.",
    "Cuadre diario."
  ]
}

No agregues información que el usuario no proporcionó.
      `,

      input: JSON.stringify(data),

      text: {
        format: {
          type: "json_schema",
          name: "normalized_cv",

          strict: true,

          schema: {
            type: "object",
            additionalProperties: false,

            properties: {
              nombre: {
                type: "string",
              },

              profesion: {
                type: "string",
              },

              contacto: {
                type: "object",
                additionalProperties: false,

                properties: {
                  telefono: {
                    type: "string",
                  },

                  email: {
                    type: "string",
                  },

                  ubicacion: {
                    type: "string",
                  },

                  web: {
                    type: "string",
                  },
                },

                required: [
                  "telefono",
                  "email",
                  "ubicacion",
                  "web",
                ],
              },

              perfil: {
                type: "string",
              },

              experiencia: {
                type: "array",

                items: {
                  type: "object",
                  additionalProperties: false,

                  properties: {
                    puesto: {
                      type: "string",
                    },

                    empresa: {
                      type: "string",
                    },

                    periodo: {
                      type: "string",
                    },

                    descripcion: {
                      type: "array",

                      items: {
                        type: "string",
                      },
                    },
                  },

                  required: [
                    "puesto",
                    "empresa",
                    "periodo",
                    "descripcion",
                  ],
                },
              },

              educacion: {
                type: "array",

                items: {
                  type: "object",
                  additionalProperties: false,

                  properties: {
                    nivel: {
                      type: "string",
                    },

                    titulo: {
                      type: "string",
                    },

                    institucion: {
                      type: "string",
                    },
                  },

                  required: [
                    "nivel",
                    "titulo",
                    "institucion",
                  ],
                },
              },

              habilidades: {
                type: "array",

                items: {
                  type: "object",
                  additionalProperties: false,

                  properties: {
                    nombre: {
                      type: "string",
                    },
                  },

                  required: [
                    "nombre",
                  ],
                },
              },

              idiomas: {
                type: "array",

                items: {
                  type: "object",
                  additionalProperties: false,

                  properties: {
                    idioma: {
                      type: "string",
                    },

                    nivel: {
                      type: "string",
                    },
                  },

                  required: [
                    "idioma",
                    "nivel",
                  ],
                },
              },

              certificaciones: {
                type: "array",

                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {},
                },
              },
            },

            required: [
              "nombre",
              "profesion",
              "contacto",
              "perfil",
              "experiencia",
              "educacion",
              "habilidades",
              "idiomas",
              "certificaciones",
            ],
          },
        },
      },
    });

    const texto = response.output_text;

    if (!texto) {
      return data;
    }

    return JSON.parse(texto);
  } catch (error) {
    console.error(
      "Error normalizando CV con GPT:",
      error
    );

    // El CV sigue funcionando aunque GPT falle.
    return data;
  }
}
