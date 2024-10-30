const { propiedadService, usuarioService, inmobiliariaService } = require('../repositories/services');

class PropiedadController {
    constructor() {
        this.propiedadService = propiedadService;
        this.usuarioService = usuarioService;
        this.inmobiliariaService = inmobiliariaService;
    }

    // Obtener todas las propiedades
    getPropiedades = async (req, res) => {
        try {
            const propiedades = await this.propiedadService.getPropiedades();
            res.status(200).json(propiedades);
        } catch (error) {
            console.error('Error al obtener propiedades:', error);
            res.status(500).json({ message: 'Error al obtener propiedades' });
        }
    };

    // Obtener propiedades con limites
    getPropiedadesLimited = async (req, res) => {
        const { filter, options } = req.body; 
        try {
            const propiedades = await this.propiedadService.getPropiedadesLimited({ filter, options });
            res.status(200).json(propiedades);
        } catch (error) {
            console.error('Error al obtener propiedades limitadas:', error);
            res.status(500).json({ message: 'Error al obtener propiedades limitadas' });
        }
    };

    // Obtener una propiedad segun un filtro
    getPropiedadBy = async (req, res) => {
        const filter = req.body; // req.params o req.query segun necesidad
        try {
            const propiedad = await this.propiedadService.getPropiedadBy(filter);
            if (propiedad) {
                res.status(200).json(propiedad);
            } else {
                res.status(404).json({ message: 'Propiedad no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener propiedad:', error);
            res.status(500).json({ message: 'Error al obtener propiedad' });
        }
    };

    // Obtener una propiedad por ID
    getPropiedadById = async (req, res) => {
        const { pid } = req.params;
        try {
            const propiedad = await this.propiedadService.getPropiedadById(pid);
            if (propiedad) {
                res.status(200).json(propiedad);
            } else {
                res.status(404).json({ message: 'Propiedad no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener propiedad por ID:', error);
            res.status(500).json({ message: 'Error al obtener propiedad por ID' });
        }
    };

    // Crear una nueva propiedad
    createPropiedad = async (req, res) => {
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
    
            // Crear el objeto de propiedad
            const nuevaPropiedad = {
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
    
            // Crear la propiedad en la base de datos
            const propiedadCreada = await this.propiedadService.createPropiedad(nuevaPropiedad);
    
            // Agregar el ID de la propiedad creada al usuario o inmobiliaria
            if (uid) {
                await this.usuarioService.updateUsuario(uid, { $push: { propiedades: propiedadCreada._id } });
            } else if (iid) {
                await this.inmobiliariaService.updateInmobiliaria(iid, { $push: { propiedades: propiedadCreada._id } });
            }
    
            // Enviar respuesta
            res.status(201).json(propiedadCreada);
        } catch (error) {
            console.error('Error al crear propiedad:', error);
            res.status(500).json({ message: 'Error al crear propiedad' });
        }
    };
    
    // Actualizar una propiedad segun ID
    updatePropiedad = async (req, res) => {
        const { pid } = req.params;
        const updatedFields = req.body;
        try {
            const propiedadActualizada = await this.propiedadService.updatePropiedad(pid, updatedFields);
            if (propiedadActualizada) {
                res.status(200).json(propiedadActualizada);
            } else {
                res.status(404).json({ message: 'Propiedad no encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar propiedad:', error);
            res.status(500).json({ message: 'Error al actualizar propiedad' });
        }
    };

    // Eliminar una propiedad segun ID
    deletePropiedad = async (req, res) => {
        const { pid, uid, iid } = req.params; // Obtener el ID de la propiedad y del usuario o inmobiliaria
        try {
            // Primero, obtener la propiedad que se va a eliminar
            const propiedadEliminada = await this.propiedadService.getPropiedadById(pid);
            if (!propiedadEliminada) {
                return res.status(404).json({ message: 'Propiedad no encontrada' });
            }
    
            // Eliminar la propiedad de la base de datos
            await this.propiedadService.deletePropiedad(pid);
    
            // Eliminar la propiedad del array de propiedades en el usuario o inmobiliaria
            if (uid) {
                await this.usuarioService.updateUsuario(uid, { $pull: { propiedades: propiedadEliminada._id } });
            } else if (iid) {
                await this.inmobiliariaService.updateInmobiliaria(iid, { $pull: { propiedades: propiedadEliminada._id } });
            }
    
            // Enviar respuesta
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar propiedad:', error);
            res.status(500).json({ message: 'Error al eliminar propiedad' });
        }
    };
    
    
}

module.exports = PropiedadController;
