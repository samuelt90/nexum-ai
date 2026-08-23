import ejs from "ejs";
import path from "path";

export async function renderCV(data) {
  const templatePath = path.join(
    process.cwd(),
    "lib/templates/cv/base_ats.ejs"
  );

  const html = await ejs.renderFile(templatePath, {
    nombre: capitalize(data.nombre),
    profesion: capitalize(data.profesion),
    contacto: data.contacto || {},
    perfil: data.perfil || "",
    experiencia: data.experiencia || [],
    educacion: data.educacion || [],
    habilidades: data.habilidades || [],
    idiomas: data.idiomas || [],
    certificaciones: data.certificaciones || [],
  });

  return html;
}

function capitalize(text) {
  if (!text) return "";

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
}
