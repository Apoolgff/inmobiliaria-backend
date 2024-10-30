const { publicacionService, usuarioService, inmobiliariaService } = require('../repositories/services');

class PublicacionController {
    constructor() {
        this.publicacionService = publicacionService;
        this.usuarioService = usuarioService;
        this.inmobiliariaService = inmobiliariaService;
    }

    getPublicaciones = async (req, res) => {
        try {
            const publicaciones = await this.publicacionService.getPublicacion();
            res.status(200).json(publicaciones);
        } catch (error) {
            console.error('Error al obtener publicaciones:', error);
            res.status(500).json({ message: 'Error al obtener publicaciones' });
        }
    };

    // Obtener una publicación por ID
    getPublicacionById = async (req, res) => {
        const { pid } = req.params;
        try {
            const publicacion = await this.publicacionService.getPublicacionById(pid);
            if (publicacion) {
                res.status(200).json(publicacion);
            } else {
                res.status(404).json({ message: 'Publicación no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener publicación por ID:', error);
            res.status(500).json({ message: 'Error al obtener publicación por ID' });
        }
    };

    // Crear una nueva publicación
    createPublicacion = async (req, res) => {
        const { propiedad, tipo, tipo_publicacion, tiempo_max_alquiler, precio_venta, precio_alquiler } = req.body;
        const { uid, iid } = req.params;

        const fechaActual = new Date();
        const nuevaPublicacion = {
            propiedad,
            tipo,
            tipo_publicacion,
            usuario: uid || null,
            inmobiliaria: iid || null,
            estado: true,
            fecha_creacion: fechaActual,
            tiempo_max_alquiler: tipo === 'alquiler' ? tiempo_max_alquiler : undefined,
            precio_venta: tipo === 'venta' ? precio_venta : undefined,
            precio_alquiler: tipo === 'alquiler' ? precio_alquiler : undefined, 
        };

        // Ajustes según el tipo de publicación
        if (tipo_publicacion === 'standard') {
            const fechaExpiracion = new Date(fechaActual);
            fechaExpiracion.setDate(fechaExpiracion.getDate() + 90);  // Duración 90 días
            nuevaPublicacion.visibilidad = 'normal';  // Visibilidad normal por defecto
            nuevaPublicacion.fecha_expiracion = fechaExpiracion;
        } else if (tipo_publicacion === 'premium') {
            nuevaPublicacion.visibilidad = 'destacada';  // Visibilidad destacada
            nuevaPublicacion.fecha_expiracion = null;    // Dura hasta que el usuario la desactive
        }

        try {
            const publicacionCreada = await this.publicacionService.createPublicacion(nuevaPublicacion);

            if (uid) {
                await this.usuarioService.updateUsuario(uid, { $push: { publicaciones: publicacionCreada._id } });
            }
            if (iid) {
                await this.inmobiliariaService.updateInmobiliaria(iid, { $push: { publicaciones: publicacionCreada._id } });
            }

            res.status(201).json(publicacionCreada);
        } catch (error) {
            console.error('Error al crear publicación:', error);
            res.status(500).json({ message: 'Error al crear publicación' });
        }
    };

    // Actualizar una publicación según ID
    updatePublicacion = async (req, res) => {
        const { pid } = req.params;
        const updatedFields = req.body;

        try {
            const publicacionActualizada = await this.publicacionService.updatePublicacion(pid, updatedFields);
            if (publicacionActualizada) {
                res.status(200).json(publicacionActualizada);
            } else {
                res.status(404).json({ message: 'Publicación no encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar publicación:', error);
            res.status(500).json({ message: 'Error al actualizar publicación' });
        }
    };

    deletePublicacion = async (req, res) => {
        const { pid, uid, iid } = req.params; 
        try {
            console.log(`Iniciando eliminación de la publicación con ID: ${pid}`);
            console.log(`usuario: ${uid}`);
    
            // Obtener la publicación a eliminar
            const publicacionEliminada = await this.publicacionService.getPublicacionById(pid);
            console.log(publicacionEliminada);
            if (!publicacionEliminada) {
                console.log(`Publicación con ID: ${pid} no encontrada`);
                return res.status(404).json({ message: 'Publicación no encontrada' });
            }
    
            // Eliminar la publicación de la base de datos
            console.log(`Eliminando publicación con ID: ${pid}`);
            await this.publicacionService.deletePublicacion(pid);
    
            // Remover la publicación del array en el usuario o inmobiliaria
            if (uid) {
                console.log(`Removiendo publicación de usuario con ID: ${uid}`);
                await this.usuarioService.updateUsuario(uid, { $pull: { publicaciones: pid } });
            } else if (iid) {
                console.log(`Removiendo publicación de inmobiliaria con ID: ${iid}`);
                await this.inmobiliariaService.updateInmobiliaria(iid, { $pull: { publicaciones: pid } });
            }
    
            // Enviar respuesta de éxito
            console.log(`Publicación con ID: ${pid} eliminada exitosamente`);
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar publicación:', error);
            res.status(500).json({ message: 'Error al eliminar publicación' });
        }
    };
    
    
}

module.exports = PublicacionController;
