const { propiedadModel } = require('./models/propiedad.model');

class PropiedadDaoMongo {
    constructor() {
        this.model = propiedadModel;
    }

    // Crear una nueva propiedad
    async create(propiedad) {
        return await this.model.create(propiedad);
    }

    // Mostrar todas las propiedades
    async get() {
        return await this.model.find();
    }

    // Obtener propiedades con paginación o límites
    async getLimited({ filter, options }) {
        return await this.model.paginate(filter, options);
    }

    // Mostrar una propiedad según un filtro
    async getBy(filter) {
        return await this.model.findOne(filter);
    }

    // Obtener una propiedad por ID
    async getById(propiedadId) {
        return await this.model.findById({ _id: propiedadId });
    }

    // Actualizar una propiedad según ID
    async update(propiedadId, updatedFields) {
        return await this.model.findOneAndUpdate(
            { _id: propiedadId },
            { $set: updatedFields },
            { new: true }
        );
    }

    // Eliminar una propiedad según ID
    async delete(propiedadId) {
        return await this.model.findByIdAndDelete({_id:propiedadId});
    }
}

module.exports = PropiedadDaoMongo;
