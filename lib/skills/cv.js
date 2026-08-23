import client from "@/lib/openai";

export async function generarCV(input) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
Convierte el texto del usuario en un JSON con esta estructura EXACTA:

{
  "nombre": "",
  "profesion": "",
  "contacto": {
    "telefono": "",
    "email": "",
    "ubicacion": "",
    "web": ""
  },
  "experiencia": [
    {
      "puesto": "",
      "empresa": "",
      "fecha": "",
      "descripcion": []
    }
  ],
  "educacion": [
    {
      "titulo": "",
      "institucion": "",
      "fecha": ""
    }
  ],
  "habilidades": [
    {
      "nombre": ""
    }
  ],
  "perfil": ""
}

Reglas:
- No inventes datos
- Debes EXTRAER explícitamente del texto del usuario:
  - telefono (si aparece un número)
  - email (si aparece un correo)
  - ubicacion (si menciona ciudad o país)
  - web (si menciona un sitio)

- Si el dato aparece en el texto, DEBES incluirlo en contacto
- No dejes contacto vacío si hay información en el texto

- Genera un perfil profesional basado en la información disponible (resumen breve)
`
      },
      {
        role: "user",
        content: input
      }
    ],
  });

  const texto = completion.choices[0].message.content;

  try {
    const data = JSON.parse(texto);

    // 🔵 FUNCIÓN LIMPIEZA
    function limpiarTexto(str) {
    if (!str) return "";

  return str
    .trim()
    .replace(/\s+/g, " ") // limpia espacios dobles
    .replace(/^./, l => l.toUpperCase()); // solo primera letra
}

    // 🔵 LIMPIEZA GENERAL
    data.nombre = limpiarTexto(data.nombre);
    data.profesion = limpiarTexto(data.profesion);

    if (Array.isArray(data.habilidades)) {
      data.habilidades = data.habilidades.map(h => ({
        nombre: limpiarTexto(h.nombre)
      }));
    }

    if (Array.isArray(data.experiencia)) {
      data.experiencia = data.experiencia.map(exp => ({
        ...exp,
        puesto: limpiarTexto(exp.puesto),
        empresa: limpiarTexto(exp.empresa),
        descripcion: Array.isArray(exp.descripcion)
          ? exp.descripcion.map(d => limpiarTexto(d))
          : []
      }));
    }

    if (Array.isArray(data.educacion)) {
      data.educacion = data.educacion.map(ed => ({
        ...ed,
        titulo: limpiarTexto(ed.titulo),
        institucion: limpiarTexto(ed.institucion)
      }));
    }

    data.perfil = limpiarTexto(data.perfil);

    // 🔵 VALIDACIÓN FINAL
    return {
      nombre: data.nombre || "",
      profesion: data.profesion || "",
      contacto: data.contacto || {},
      experiencia: Array.isArray(data.experiencia) ? data.experiencia : [],
      educacion: Array.isArray(data.educacion) ? data.educacion : [],
      habilidades: Array.isArray(data.habilidades) ? data.habilidades : [],
      perfil: data.perfil || ""
    };

  } catch (e) {
    // 🔴 FALLBACK
    return {
      nombre: "",
      profesion: "",
      contacto: {},
      experiencia: [],
      educacion: [],
      habilidades: [],
      perfil: ""
    };
  }
}
