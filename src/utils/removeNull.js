function removeNull(obj, seen = new Set()) {
    // Verificar si el valor es un objeto
    if (obj && typeof obj === 'object') {
      // Evitar referencias cíclicas
      if (seen.has(obj)) return obj;
      seen.add(obj);
  
      for (const key in obj) {
        // Llamada recursiva para limpiar propiedades anidadas
        if (typeof obj[key] === 'object') {
          removeNull(obj[key], seen);
        }
  
        // Eliminar la clave si su valor es null
        if (obj[key] === null) {
          delete obj[key];
        }
      }
    }
    return obj;
  }
  
  module.exports = { removeNull };
  