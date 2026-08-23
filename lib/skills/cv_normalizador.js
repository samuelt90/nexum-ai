export function normalizarCV(data) {
  const normalizado = { ...data };

  function clean(str) {
    if (!str) return "";
    return str.trim().toLowerCase();
  }

  // 🔵 nombre y profesión
  normalizado.nombre = clean(data.nombre);
  normalizado.profesion = clean(data.profesion);

  // 🔵 contacto
  normalizado.contacto = {
    telefono: clean(data.contacto?.telefono),
    email: clean(data.contacto?.email),
    ubicacion: clean(data.contacto?.ubicacion),
    web: clean(data.contacto?.web)
  };

  // 🔵 experiencia
  normalizado.experiencia = (data.experiencia || []).map(exp => ({
    puesto: clean(exp.puesto),
    empresa: clean(exp.empresa),
    fecha: clean(exp.fecha),
    descripcion: Array.isArray(exp.descripcion)
      ? exp.descripcion.map(d => clean(d))
      : []
  }));

  // 🔵 educación
  normalizado.educacion = (data.educacion || []).map(ed => ({
    titulo: clean(ed.titulo),
    institucion: clean(ed.institucion),
    fecha: clean(ed.fecha)
  }));

  // 🔵 habilidades
  normalizado.habilidades = (data.habilidades || []).map(h => ({
    nombre: clean(h.nombre)
  }));

  // 🔵 perfil
  normalizado.perfil = clean(data.perfil);

  return normalizado;
}
