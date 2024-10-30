const cron = require('node-cron');
const { publicacionModel } = require('../models/Publicacion'); // Asegúrate de que el path sea correcto

// Tarea programada: verificar publicaciones estándar cada día a la medianoche
cron.schedule('0 0 * * *', async () => {
    console.log("Ejecutando tarea programada para actualizar publicaciones estándar");

    const fechaActual = new Date();

    try {
        // Busca publicaciones estándar que estén activas y cuya fecha de expiración haya pasado
        const publicacionesExpiradas = await publicacionModel.find({
            tipo_publicacion: 'standard',
            estado: true,
            fecha_expiracion: { $lte: fechaActual }
        });

        if (publicacionesExpiradas.length > 0) {
            // Actualiza el estado de las publicaciones expiradas a inactivo
            await publicacionModel.updateMany(
                { _id: { $in: publicacionesExpiradas.map(pub => pub._id) } },
                { $set: { estado: false } }
            );
            console.log(`${publicacionesExpiradas.length} publicaciones estándar expiradas actualizadas a inactivas.`);
        } else {
            console.log("No hay publicaciones estándar expiradas por inactivar.");
        }
    } catch (error) {
        console.error("Error al actualizar publicaciones estándar:", error);
    }
});
