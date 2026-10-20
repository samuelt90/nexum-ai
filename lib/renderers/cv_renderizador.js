import ejs from "ejs";
import path from "path";

const CV_TEMPLATES = {
  ats: "base_ats.ejs",
  professional:
    "base_visual_professional.ejs",
  creative:
    "base_visual_creative.ejs",
};

export async function renderCV(
  data,
  template = "ats"
) {
  const templateFile =
    CV_TEMPLATES[template];

  if (!templateFile) {
    throw new Error(
      `Plantilla CV no válida: ${template}`
    );
  }

  const templatePath = path.join(
    process.cwd(),
    "lib/templates/cv",
    templateFile
  );

  const html = await ejs.renderFile(
    templatePath,
    {
      nombre: capitalize(data.nombre),
      profesion: capitalize(
        data.profesion
      ),

      contacto:
        data.contacto || {},

      perfil:
        data.perfil || "",

      experiencia:
        data.experiencia || [],

      educacion:
        data.educacion || [],

      habilidades:
        data.habilidades || [],

      idiomas:
        data.idiomas || [],

      certificaciones:
        data.certificaciones || [],
    }
  );

  return html;
}

function capitalize(text) {
  if (!text) {
    return "";
  }

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
}
