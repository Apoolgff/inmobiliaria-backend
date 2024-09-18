const cron = require('node-cron');
const axios = require('axios');
const Propiedad = require('../models/propiedad');

// URL del JSON del CRM
const CRM_JSON_URL = 'URL_DEL_CRM_JSON';

// Función para actualizar la base de datos
const updateDatabase = async () => {
  try {
    // Obtener datos del CRM
    const response = await axios.get(CRM_JSON_URL);
    const propiedades = response.data;

    for (const propiedad of propiedades) {
      await Propiedad.findOneAndUpdate(
        { id: propiedad.id },
        propiedad,
        { upsert: true, new: true }
      );
    }

    console.log('Base de datos actualizada con éxito');
  } catch (error) {
    console.error('Error al actualizar la base de datos:', error);
  }
};

// Programar la tarea para que se ejecute diariamente a las 00:00
cron.schedule('0 0 * * *', () => {
  console.log('Ejecutando tarea de sincronización...');
  updateDatabase();
});
