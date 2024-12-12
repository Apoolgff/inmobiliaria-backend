const { publicacionService, cuentaService } = require('../repositories/services');
const { unflattenObject } = require('../utils/unFlattenObjects');

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
            // Desanidar el cuerpo de la solicitud
            const data = unflattenObject(req.body);
    
            // Extraer datos desanidados
            const {
                tipo,
                id,
                Inmobiliaria,
                Broker,
                enVenta,
                enAlquiler,
                titulo,
                descripcion,
                Ubicacion, // Ya como objeto
                Caracteristicas, // Ya como objeto
                destacada,
                venta, // Ya como objeto
                alquiler, // Ya como objeto
                url,
            } = data;
    
            const { cid } = req.params;
    
            // Validar la cuenta
            if (!cid) {
                return res.status(400).json({ message: 'El ID de la cuenta (cid) es requerido' });
            }
    
            const cuenta = await this.cuentaService.getCuentaBy({ _id: cid });
            if (!cuenta) {
                return res.status(404).json({ message: 'Cuenta no encontrada' });
            }
    
            // Determinar el tipo de propietario
            const propietarioTipo =
                cuenta.tipo === 'Usuario'
                    ? 'Usuarios'
                    : cuenta.tipo === 'Inmobiliaria'
                    ? 'Inmobiliarias'
                    : null;
    
            if (!propietarioTipo) {
                return res.status(400).json({ message: 'Tipo de cuenta no válido para publicaciones' });
            }
    
            // Validar campos booleanos
            const esEnVenta = enVenta === 'true' || enVenta === true;
            const esEnAlquiler = enAlquiler === 'true' || enAlquiler === true;
            const esDestacada = destacada === 'true' || destacada === true;
    
            // Validar fotos
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'Se requieren imágenes para la publicación' });
            }
    
            // Procesar imágenes subidas
            const fotos = req.files.map((file, index) => ({
                url: file.path, // Usar 'path' en lugar de 'secure_url'
                descripcion: req.body.fotoDescripcion ? req.body.fotoDescripcion[index] || '' : '', // Descripción de la foto
            }));
            
    
            // Crear objeto para la publicación
            const nuevaPublicacion = {
                propietario: cuenta._id,
                propietarioTipo,
                tipo,
                id,
                Inmobiliaria,
                Broker,
                enVenta: esEnVenta,
                enAlquiler: esEnAlquiler,
                titulo,
                descripcion,
                Ubicacion, // Objeto completo
                Caracteristicas, // Objeto completo
                destacada: esDestacada,
                venta, // Objeto completo
                alquiler, // Objeto completo
                fotos, // Lista de fotos procesadas
                url,
            };
    
            // Guardar la publicación en la base de datos
            const publicacionCreada = await this.publicacionService.createPublicacion(nuevaPublicacion);
    
            // Actualizar la cuenta con la referencia a la nueva publicación
            await this.cuentaService.updateCuenta(cuenta._id, { $push: { publicaciones: publicacionCreada._id } });
    
            // Responder con la publicación creada
            res.status(201).json(publicacionCreada);
        } catch (error) {
            console.error('Error al crear publicación:', error);
            res.status(500).json({ message: 'Error al crear publicación', error: error.message });
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
