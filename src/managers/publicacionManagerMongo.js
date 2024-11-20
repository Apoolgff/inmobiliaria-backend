const { publicacionModel } = require('./models/prublicacion.model');

class PublicacionDaoMongo {
    constructor() {
        this.model = publicacionModel;
    }

    //Crear una nueva publicacion
    async create(publicacion) {
        return await this.model.create(publicacion);
    }

    //Mostrar todas las publicaciones
    async get() {
        return await this.model.find();
    }

    //Obtener publicaciones con paginacion o limites
    async getLimited({ filter, options }) {
        return await this.model.paginate(filter, options);
    }

    //Mostrar una publicacion por un filtro
    async getBy(filter) {
        return await this.model.findOne(filter);
    }

    //Mostrar publicaciones de un usuario
    async getByUser(filter) {
        return await this.model.find({propietario: filter});
    }

    //Obtener una publicacion por ID
    async getById(publicacionId) {
        return await this.model.findById({ _id: publicacionId });
    }

    //Actualizar una publicacion por ID
    async update(publicacionId, updatedFields) {
        return await this.model.findOneAndUpdate(
            { _id: publicacionId },
            { $set: updatedFields },
            { new: true }
        );
    }

    //Eliminar una publicacion por ID
    async delete(publicacionId) {
        return await this.model.findByIdAndDelete({_id:publicacionId});
    }
}

module.exports = PublicacionDaoMongo;
