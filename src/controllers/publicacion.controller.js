const { publicacionService, cuentaService } = require('../repositories/services');

class PublicacionController {
    constructor() {
        this.publicacionService = publicacionService;
        this.cuentaService = cuentaService;
    }

    //Obtener todas las Publicaciones
    getPublicaciones = async (req, res) => {
        try {
            const publicaciones = await this.publicacionService.getPublicaciones();
            res.status(200).json(publicaciones);
        } catch (error) {
            console.error('Error al obtener publicaciones:', error);
            res.status(500).json({ message: 'Error al obtener publicaciones' });
        }
    };

    //Obtener Publicaciones con limites
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

    //Obtener una publicacion segun un filtro
    getPublicacionBy = async (req, res) => {
        const filter = req.body; 
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

    //Obtener una publicaciones por ID
    getPublicacionesByUserId = async (req, res) => {
        const { cid } = req.params;
        try {
            const publicaciones = await this.publicacionService.getPublicacionesByUserId(cid); // Nota el cambio aquí para obtener todas las publicaciones
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
    

    //Obtener una Publicacion por ID
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

    //Crear una nueva Publicacion
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
    
            const { cid } = req.params;
    
            if (!cid) {
                return res.status(400).json({ message: 'El ID de la cuenta (cid) es requerido' });
            }
    
        
            const cuenta = await this.cuentaService.getCuentaBy({_id: cid});
    
            if (!cuenta) {
                return res.status(404).json({ message: 'Cuenta no encontrada' });
            }
    
            let propietarioTipo;
    
   
            if (cuenta.tipo === 'Usuario') {
                propietarioTipo = 'Usuarios';
            } else if (cuenta.tipo === 'Inmobiliaria') {
                propietarioTipo = 'Inmobiliarias';
            } else {
                return res.status(400).json({ message: 'Tipo de cuenta no válido para publicaciones' });
            }
    

            const nuevaPublicacion = {
                propietario: cuenta._id, 
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
    

            const publicacionCreada = await this.publicacionService.createPublicacion(nuevaPublicacion);
    

            await this.cuentaService.updateCuenta(cuenta._id, { $push: { publicaciones: publicacionCreada._id } });
    
      
            res.status(201).json(publicacionCreada);
        } catch (error) {
            console.error('Error al crear publicación:', error);
            res.status(500).json({ message: 'Error al crear publicación' });
        }
    };
    
    
    //Actualizar una publicacion por ID
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

    //Eliminar una publicacion por ID
    deletePublicacion = async (req, res) => {
        const { pid, cid } = req.params;
        try {
  
            const publicacionEliminada = await this.publicacionService.getPublicacionById(pid);
            if (!publicacionEliminada) {
                return res.status(404).json({ message: 'publicacion no encontrada' });
            }
    

            await this.publicacionService.deletePublicacion(pid);
    
   
            if (cid) {
                await this.usuarioService.updateUsuario(cid, { $pull: { publicaciones: publicacionEliminada._id } });
            } 
    

            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar publicacion:', error);
            res.status(500).json({ message: 'Error al eliminar publicacion' });
        }
    };
    
    
}

module.exports = PublicacionController;
