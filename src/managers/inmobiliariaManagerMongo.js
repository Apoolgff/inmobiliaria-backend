const { inmobiliariaModel } = require('./models/inmobiliaria.model');

class InmobiliariaDaoMongo {
    constructor() {
        this.model = inmobiliariaModel;
    }

    // Crear un nueva inmobiliaria
    async create(inmobiliaria) {
        return await this.model.create(inmobiliaria);
    }

    // Mostrar todas las inmobiliaria
    async get() {
        return await this.model.find();
    }

    // Obtener inmobiliarias con paginacion o limites
    async getLimited({ filter, options }) {
        return await this.model.paginate(filter, options);
    }

    // Mostrar una inmobiliaria segun un filtro
    async getBy(filter) {
        return await this.model.findOne(filter);
    }

    // Obtener una inmobiliaria por ID
    async getById(inmobiliariaId) {
        return await this.model.findById({ _id: inmobiliariaId });
    }

    // Actualizar una inmobiliaria segun ID
    async update(inmobiliariaId, updatedFields) {
        return await this.model.findOneAndUpdate(
            { _id: inmobiliariaId },
            { $set: updatedFields },
            { new: true }
        );
    }

    // Eliminar una inmobiliaria según ID
    async delete(inmobiliariaId) {
        return await this.model.findByIdAndDelete({ _id: inmobiliariaId });
    }
}

module.exports = InmobiliariaDaoMongo;
