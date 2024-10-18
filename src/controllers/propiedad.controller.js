// propiedad.controller.js

const { propiedadService } = require('../repositories/services');

class PropiedadController {
    constructor() {
        this.propiedadService = propiedadService;
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

    // Obtener propiedades con límites
    getPropiedadesLimited = async (req, res) => {
        const { filter, options } = req.body; // Asegúrate de que el cliente envíe el cuerpo correctamente
        try {
            const propiedades = await this.propiedadService.getPropiedadesLimited({ filter, options });
            res.status(200).json(propiedades);
        } catch (error) {
            console.error('Error al obtener propiedades limitadas:', error);
            res.status(500).json({ message: 'Error al obtener propiedades limitadas' });
        }
    };

    // Obtener una propiedad según un filtro
    getPropiedadBy = async (req, res) => {
        const filter = req.body; // O puedes usar req.params o req.query según tu necesidad
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
        const { id } = req.params;
        try {
            const propiedad = await this.propiedadService.getPropiedadById(id);
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
        } = req.body; // Asegúrate de que el cliente envíe el cuerpo correctamente

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

        try {
            const propiedadCreada = await this.propiedadService.createPropiedad(nuevaPropiedad);
            res.status(201).json(propiedadCreada);
        } catch (error) {
            console.error('Error al crear propiedad:', error);
            res.status(500).json({ message: 'Error al crear propiedad' });
        }
    };

    // Actualizar una propiedad según ID
    updatePropiedad = async (req, res) => {
        const { pid } = req.params;
        const updatedFields = req.body; // Asegúrate de que el cliente envíe el cuerpo correctamente
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

    // Eliminar una propiedad según ID
    deletePropiedad = async (req, res) => {
        const { pid } = req.params;
        try {
            const propiedadEliminada = await this.propiedadService.deletePropiedad(pid);
            if (propiedadEliminada) {
                res.status(204).send(); // 204 No Content
            } else {
                res.status(404).json({ message: 'Propiedad no encontrada' });
            }
        } catch (error) {
            console.error('Error al eliminar propiedad:', error);
            res.status(500).json({ message: 'Error al eliminar propiedad' });
        }
    };
}

module.exports = PropiedadController;
