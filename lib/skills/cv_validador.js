export function validarCV(data) {
  const faltantes = [];

  // 🔵 básicos
  if (!data.nombre) {
    faltantes.push("nombre");
  }

  if (!data.profesion) {
    faltantes.push("profesion");
  }

  // 🔵 contacto mínimo
  if (!data.contacto || Object.keys(data.contacto).length === 0) {
    faltantes.push("contacto");
  }

  // 🔵 experiencia
  if (!Array.isArray(data.experiencia) || data.experiencia.length === 0) {
    faltantes.push("experiencia");
  }

  // 🔵 habilidades
  if (!Array.isArray(data.habilidades) || data.habilidades.length === 0) {
    faltantes.push("habilidades");
  }

  // 🔵 educación (opcional, pero lo marcamos si falta)
  if (!Array.isArray(data.educacion) || data.educacion.length === 0) {
    faltantes.push("educacion");
  }

  return {
    completo: faltantes.length === 0,
    faltantes
  };
}
