// propiedad.controller.js

const { PropiedadRepository } = require('../repositories/propiedad.repository');

// Instanciar el repositorio de propiedades
const propiedadRepository = new PropiedadRepository();

// Crear una nueva propiedad
createPropiedad = async (req, res) => {
    try {
        // Extraemos todos los datos que necesitamos del body de la solicitud
        const {
            tipo, id, inmobiliaria, broker, enVenta, enAlquiler, titulo, descripcion,
            ubicacion, caracteristicas, destacada, venta, alquiler, fotos, url
        } = req.body;

        // Validar datos del subesquema inmobiliaria
        if (!inmobiliaria || typeof inmobiliaria !== 'object') {
            return res.status(400).json({ message: "Datos de inmobiliaria son obligatorios y deben ser un objeto." });
        }
        const { nombre, codigo, email, direccion, telefono, celular, sucursal, logo } = inmobiliaria;
        if (!nombre || !codigo || !email || !direccion) {
            return res.status(400).json({ message: "Faltan campos en el subesquema inmobiliaria." });
        }

        // Validar datos del subesquema broker
        if (!broker || typeof broker !== 'object') {
            return res.status(400).json({ message: "Datos de broker son obligatorios y deben ser un objeto." });
        }
        const { id: brokerId, nombre: brokerNombre, telefono: brokerTelefono, email: brokerEmail, foto: brokerFoto } = broker;
        if (!brokerId || !brokerNombre || !brokerTelefono || !brokerEmail) {
            return res.status(400).json({ message: "Faltan campos en el subesquema broker." });
        }

        // Validar datos del subesquema ubicacion
        if (!ubicacion || typeof ubicacion !== 'object') {
            return res.status(400).json({ message: "Datos de ubicacion son obligatorios y deben ser un objeto." });
        }
        const { departamento, ciudad, barrio, distanciamarmetros, frentealmar, direccion: ubicacionDireccion, lat, lon } = ubicacion;
        if (!departamento || !ciudad || !barrio) {
            return res.status(400).json({ message: "Faltan campos en el subesquema ubicacion." });
        }

        // Validar datos del subesquema caracteristicas
        if (!caracteristicas || typeof caracteristicas !== 'object') {
            return res.status(400).json({ message: "Datos de caracteristicas son obligatorios y deben ser un objeto." });
        }
        // Puedes agregar más validaciones específicas según los requerimientos de cada campo

        // Validar datos del subesquema venta
        if (venta && typeof venta !== 'object') {
            return res.status(400).json({ message: "Datos de venta deben ser un objeto si están presentes." });
        }
        // Similar validación para venta...

        // Validar datos del subesquema alquiler
        if (alquiler && typeof alquiler !== 'object') {
            return res.status(400).json({ message: "Datos de alquiler deben ser un objeto si están presentes." });
        }
        // Similar validación para alquiler...

        // Validar datos del subesquema fotos
        if (fotos && !Array.isArray(fotos)) {
            return res.status(400).json({ message: "Fotos deben ser un arreglo de objetos." });
        }
        // Validar cada foto si es necesario...

        // Crear un objeto propiedad con todos los subesquemas
        const propiedad = {
            tipo,
            id,
            inmobiliaria,
            broker,
            enVenta,
            enAlquiler,
            titulo,
            descripcion,
            ubicacion,
            caracteristicas,
            destacada,
            venta,
            alquiler,
            fotos,
            url
        };

        // Pasamos la propiedad completa al repositorio
        const nuevaPropiedad = await this.propiedadRepository.createPropiedad(propiedad);
        res.status(201).json(nuevaPropiedad);
    } catch (error) {
        console.error("Error al crear propiedad:", error);
        res.status(500).json({ message: "Error al crear propiedad" });
    }
};

// Obtener todas las propiedades
const getPropiedades = async (req, res) => {
    try {
        const propiedades = await propiedadRepository.getPropiedades();
        return res.status(200).json(propiedades);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las propiedades' });
    }
};

// Obtener propiedades con filtros y paginación
const getPropiedadesLimited = async (req, res) => {
    try {
        const { filter, options } = req.query;
        const propiedades = await propiedadRepository.getPropiedadesLimited({ 
            filter: JSON.parse(filter || '{}'), 
            options: JSON.parse(options || '{}') 
        });
        return res.status(200).json(propiedades);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener propiedades con filtros y paginación' });
    }
};

// Obtener una propiedad por un filtro
const getPropiedadBy = async (req, res) => {
    try {
        const filter = req.query;
        const propiedad = await propiedadRepository.getPropiedadBy(filter);
        if (!propiedad) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }
        return res.status(200).json(propiedad);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener la propiedad' });
    }
};

// Obtener una propiedad por ID
const getPropiedadById = async (req, res) => {
    try {
        const propiedadId = req.params.id;
        const propiedad = await propiedadRepository.getPropiedadById(propiedadId);
        if (!propiedad) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }
        return res.status(200).json(propiedad);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener la propiedad por ID' });
    }
};

// Actualizar una propiedad según ID
const updatePropiedad = async (req, res) => {
    try {
        const propiedadId = req.params.id;
        const updatedFields = req.body;
        
        // Validar los campos actualizados (si es necesario)
        if (!Object.keys(updatedFields).length) {
            return res.status(400).json({ message: 'No hay campos para actualizar' });
        }

        const propiedadActualizada = await propiedadRepository.updatePropiedad(propiedadId, updatedFields);
        if (!propiedadActualizada) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }
        return res.status(200).json(propiedadActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar la propiedad' });
    }
};

// Eliminar una propiedad según ID
const deletePropiedad = async (req, res) => {
    try {
        const propiedadId = req.params.id;
        const propiedadEliminada = await propiedadRepository.deletePropiedad(propiedadId);
        if (!propiedadEliminada) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }
        return res.status(200).json({ message: 'Propiedad eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar la propiedad' });
    }
};

// Exportar los controladores
module.exports = {
    createPropiedad,
    getPropiedades,
    getPropiedadesLimited,
    getPropiedadBy,
    getPropiedadById,
    updatePropiedad,
    deletePropiedad
};
