const { publicacionService, usuarioService, inmobiliariaService } = require('../repositories/services');

class PublicacionController {
    constructor() {
        this.publicacionService = publicacionService;
        this.usuarioService = usuarioService;
        this.inmobiliariaService = inmobiliariaService;
    }

    // Obtener todas las Publicaciones
    getPublicaciones = async (req, res) => {
        try {
            const publicaciones = await this.publicacionService.getPublicaciones();
            res.status(200).json(publicaciones);
        } catch (error) {
            console.error('Error al obtener publicaciones:', error);
            res.status(500).json({ message: 'Error al obtener publicaciones' });
        }
    };

    // Obtener Publicaciones con limites
    getPublicacionesLimited = async (req, res) => {
        const { filter, options } = req.body; 
        try {
            const publicaciones = await this.publicacionService.getPublicacionesLimited({ filter, options });
            res.status(200).json(publicaciones);
        } catch (error) {
            console.error('Error al obtener publicaciones limitadas:', error);
            res.status(500).json({ message: 'Error al obtener publicaciones limitadas' });
        }
    };

    // Obtener una publicacion segun un filtro
    getPublicacionBy = async (req, res) => {
        const filter = req.body; // req.params o req.query segun necesidad
        try {
            const publicacion = await this.publicacionService.getPublicacionBy(filter);
            if (publicacion) {
                res.status(200).json(publicacion);
            } else {
                res.status(404).json({ message: 'Publicacion no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener propiedad:', error);
            res.status(500).json({ message: 'Error al obtener publicacion' });
        }
    };

    // Obtener una publicaciones por ID
    getPublicacionesByUserId = async (req, res) => {
        const { uid } = req.params;
        try {
            const publicaciones = await this.publicacionService.getPublicacionesByUserId(uid); // Nota el cambio aquí para obtener todas las publicaciones
            if (publicaciones && publicaciones.length > 0) {
                res.status(200).json(publicaciones);
            } else {
                res.status(404).json({ message: 'No se encontraron publicaciones para este usuario' });
            }
        } catch (error) {
            console.error('Error al obtener publicaciones del usuario:', error);
            res.status(500).json({ message: 'Error al obtener publicaciones del usuario' });
        }
    };
    

    // Obtener una Publicacion por ID
    getPublicacionById = async (req, res) => {
        const { pid } = req.params;
        try {
            const publicacion = await this.publicacionService.getPublicacionById(pid);
            if (publicacion) {
                res.status(200).json(publicacion);
            } else {
                res.status(404).json({ message: 'Publicacion no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener Publicacion por ID:', error);
            res.status(500).json({ message: 'Error al obtener Publicacion por ID' });
        }
    };

    // Crear una nueva propiedad
    createPublicacion = async (req, res) => {
        try {
            const {
                tipo,
                id,
                Inmobiliaria,
                Broker,
                enVenta,
                enAlquiler,
                titulo,
                descripcion,
                Ubicacion,
                Caracteristicas,
                destacada,
                venta,
                alquiler,
                fotos,
                url,
            } = req.body;
    
            const { uid, iid } = req.params;

            let propietario;
            let propietarioTipo;
    
            if (uid) {
                propietario = uid;
                propietarioTipo = 'Usuarios';
            } else if (iid) {
                propietario = iid;
                propietarioTipo = 'Inmobiliarias';
            }
    
            // Crear el objeto de propiedad
            const nuevaPublicacion = {
                propietario,
                propietarioTipo,
                tipo,
                id,
                Inmobiliaria,
                Broker,
                enVenta: enVenta || false,
                enAlquiler: enAlquiler || false,
                titulo,
                descripcion,
                Ubicacion,
                Caracteristicas,
                destacada: destacada || false,
                venta,
                alquiler,
                fotos,
                url,
            }; 
    
            // Crear la publicacion en la base de datos
            const publicacionCreada = await this.publicacionService.createPublicacion(nuevaPublicacion);
    
            // Agregar el ID de la publicacion creada al usuario o inmobiliaria
            if (uid) {
                await this.usuarioService.updateUsuario(uid, { $push: { publicaciones: publicacionCreada._id } });
            } else if (iid) {
                await this.inmobiliariaService.updateInmobiliaria(iid, { $push: { publicaciones: propiedadCreada._id } });
            }
    
            // Enviar respuesta
            res.status(201).json(publicacionCreada);
        } catch (error) {
            console.error('Error al crear publicacion:', error);
            res.status(500).json({ message: 'Error al crear publicacion' });
        }
    };
    
    // Actualizar una publicacion segun ID
    updatePublicacion = async (req, res) => {
        const { pid } = req.params;
        const updatedFields = req.body;
        try {
            const publicacionActualizada = await this.publicacionService.updatePublicacion(pid, updatedFields);
            if (publicacionActualizada) {
                res.status(200).json(publicacionActualizada);
            } else {
                res.status(404).json({ message: 'publicacion no encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar publicacion:', error);
            res.status(500).json({ message: 'Error al actualizar publicacion' });
        }
    };

    // Eliminar una publicacion segun ID
    deletePublicacion = async (req, res) => {
        const { pid, uid, iid } = req.params; // Obtener el ID de la publicacion y del usuario o inmobiliaria
        try {
            // Primero, obtener la publicacion que se va a eliminar
            const publicacionEliminada = await this.publicacionService.getPublicacionById(pid);
            if (!publicacionEliminada) {
                return res.status(404).json({ message: 'publicacion no encontrada' });
            }
    
            // Eliminar la publicacion de la base de datos
            await this.publicacionService.deletePublicacion(pid);
    
            // Eliminar la publicacion del array de publicaciones en el usuario o inmobiliaria
            if (uid) {
                await this.usuarioService.updateUsuario(uid, { $pull: { publicaciones: publicacionEliminada._id } });
            } else if (iid) {
                await this.inmobiliariaService.updateInmobiliaria(iid, { $pull: { publicaciones: publicacionEliminada._id } });
            }
    
            // Enviar respuesta
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar publicacion:', error);
            res.status(500).json({ message: 'Error al eliminar publicacion' });
        }
    };
    
    
}

module.exports = PublicacionController;
