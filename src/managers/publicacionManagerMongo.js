const { publicacionModel } = require('./models/publicacion.model');

class PublicacionDaoMongo {
    constructor() {
        this.model = publicacionModel;
    }

    // Crear un nuevo publicacion
    async create(publicacion) {
        return await this.model.create(publicacion);
    }

    // Mostrar todos las publicaciones
    async get() {
        return await this.model.find();
    }

    // Obtener publicaciones con paginacion o limites
    async getLimited({ filter, options }) {
        return await this.model.paginate(filter, options);
    }

    // Mostrar una publicacion segun un filtro
    async getBy(filter) {
        return await this.model.findOne(filter);
    }

    // Obtener una publicacion por ID
    async getById(publicacionId) {
        return await this.model.findById({ _id: publicacionId });
    }

    // Actualizar una publicacion segun ID
    async update(publicacionId, updatedFields) {
        return await this.model.findOneAndUpdate(
            { _id: publicacionId },
            { $set: updatedFields },
            { new: true }
        );
    }

    // Eliminar una publicacion segun ID
    async delete(publicacionId) {
        return await this.model.findByIdAndDelete({ _id: publicacionId });
    }
}

module.exports = PublicacionDaoMongo;
