const cron = require('node-cron');
const { publicacionModel } = require('../models/Publicacion');

//Tarea programada: verificar publicaciones estandar cada dia a la medianoche
cron.schedule('0 0 * * *', async () => {
    console.log("Ejecutando tarea programada para actualizar publicaciones estándar");

    const fechaActual = new Date();

    try {
        //Busca publicaciones estandar que esten activas y fuera de fecha
        const publicacionesExpiradas = await publicacionModel.find({
            tipo_publicacion: 'standard',
            estado: true,
            fecha_expiracion: { $lte: fechaActual }
        });

        if (publicacionesExpiradas.length > 0) {
            //Actualiza el estado de las publicaciones expiradas a inactivas
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
