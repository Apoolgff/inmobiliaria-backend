const { inmobiliariaService } = require('../repositories/services');

class InmobiliariaController {
    constructor() {
        this.inmobiliariaService = inmobiliariaService;
    }

    // Obtener todas las inmobiliarias
    getInmobiliarias = async (req, res) => {
        try {
            const inmobiliarias = await this.inmobiliariaService.getInmobiliarias();
            res.status(200).json(inmobiliarias);
        } catch (error) {
            console.error('Error al obtener inmobiliarias:', error);
            res.status(500).json({ message: 'Error al obtener inmobiliarias' });
        }
    };

    // Obtener inmobiliarias con límites (paginacion o filtrado)
    getInmobiliariasLimited = async (req, res) => {
        const { filter, options } = req.body; 
        try {
            const inmobiliarias = await this.inmobiliariaService.getInmobiliariasLimited({ filter, options });
            res.status(200).json(inmobiliarias);
        } catch (error) {
            console.error('Error al obtener inmobiliarias limitadas:', error);
            res.status(500).json({ message: 'Error al obtener inmobiliarias limitadas' });
        }
    };

    // Obtener una inmobiliaria segun un filtro
    getInmobiliariaBy = async (req, res) => {
        const filter = req.body; // req.params o req.query segun necesidad
        try {
            const inmobiliaria = await this.inmobiliariaService.getInmobiliariaBy(filter);
            if (inmobiliaria) {
                res.status(200).json(inmobiliaria);
            } else {
                res.status(404).json({ message: 'Inmobiliaria no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener inmobiliaria:', error);
            res.status(500).json({ message: 'Error al obtener inmobiliaria' });
        }
    };

    // Obtener una inmobiliaria por ID
    getInmobiliariaById = async (req, res) => {
        const { iid } = req.params;
        try {
            const inmobiliaria = await this.inmobiliariaService.getInmobiliariaById(iid);
            if (inmobiliaria) {
                res.status(200).json(inmobiliaria);
            } else {
                res.status(404).json({ message: 'Inmobiliaria no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener inmobiliaria por ID:', error);
            res.status(500).json({ message: 'Error al obtener inmobiliaria por ID' });
        }
    };

    // Crear una nueva inmobiliaria
    createInmobiliaria = async (req, res) => {
        const { nombre, rut, razon_social, telefono, direccion, email, password, publicaciones, propiedades } = req.body; 

        // Crear el objeto de inmobiliaria
        const nuevaInmobiliaria = {
            nombre,
            rut,
            razon_social,
            telefono,
            direccion,
            email,
            password,
            suscripcion: 'inmobiliaria', //testeo de sub para inmobiliaria
            publicaciones,
            propiedades
        };

        try {
            const inmobiliariaCreada = await this.inmobiliariaService.createInmobiliaria(nuevaInmobiliaria);
            res.status(201).json(inmobiliariaCreada);
        } catch (error) {
            console.error('Error al crear inmobiliaria:', error);
            res.status(500).json({ message: 'Error al crear inmobiliaria' });
        }
    };

    // Actualizar una inmobiliaria segun ID
    updateInmobiliaria = async (req, res) => {
        const { iid } = req.params;
        const updatedFields = req.body; 
        try {
            const inmobiliariaActualizada = await this.inmobiliariaService.updateInmobiliaria(iid, updatedFields);
            if (inmobiliariaActualizada) {
                res.status(200).json(inmobiliariaActualizada);
            } else {
                res.status(404).json({ message: 'Inmobiliaria no encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar inmobiliaria:', error);
            res.status(500).json({ message: 'Error al actualizar inmobiliaria' });
        }
    };

    // Eliminar una inmobiliaria segun ID
    deleteInmobiliaria = async (req, res) => {
        const { iid } = req.params;
        try {
            const inmobiliariaEliminada = await this.inmobiliariaService.deleteInmobiliaria(iid);
            if (inmobiliariaEliminada) {
                res.status(204).send(); 
            } else {
                res.status(404).json({ message: 'Inmobiliaria no encontrada' });
            }
        } catch (error) {
            console.error('Error al eliminar inmobiliaria:', error);
            res.status(500).json({ message: 'Error al eliminar inmobiliaria' });
        }
    };
}

module.exports = InmobiliariaController;
