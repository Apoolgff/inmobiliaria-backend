// propiedad.repository.js

const { PropiedadDaoMongo } = require('../managers/propiedadManagerMongo');

class PropiedadRepository {
    constructor() {
        this.dao = new PropiedadDaoMongo();  // Instanciamos el DAO directamente aquí
    }

    // Obtener todas las propiedades
    getPropiedades = async () => await this.dao.get();

    // Obtener propiedades con límites
    getPropiedadesLimited = async ({ filter, options }) => await this.dao.getLimited({ filter, options });

    // Obtener una propiedad según un filtro
    getPropiedadBy = async (filter) => await this.dao.getBy(filter);

    // Obtener una propiedad por ID
    getPropiedadById = async (propiedadId) => await this.dao.getById(propiedadId);

    // Crear una nueva propiedad
    createPropiedad = async (propiedad) => await this.dao.create(propiedad);

    // Actualizar una propiedad según ID
    updatePropiedad = async (pid, updatedFields) => await this.dao.update(pid, updatedFields);

    // Eliminar una propiedad según ID
    deletePropiedad = async (pid) => await this.dao.delete(pid);
}

module.exports = { PropiedadRepository };
