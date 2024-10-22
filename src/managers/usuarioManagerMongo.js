const { usuarioModel } = require('./models/usuario.model');

class UsuarioDaoMongo {
    constructor() {
        this.model = usuarioModel;
    }

    // Crear un nuevo Usuario
    async create(usuario) {
        return await this.model.create(usuario);
    }

    // Mostrar todos los Usuarios
    async get() {
        return await this.model.find();
    }

    // Obtener usuarios con paginacion o limites
    async getLimited({ filter, options }) {
        return await this.model.paginate(filter, options);
    }

    // Mostrar un usuario segun un filtro
    async getBy(filter) {
        return await this.model.findOne(filter);
    }

    // Obtener un usuario por ID
    async getById(usuarioId) {
        return await this.model.findById({ _id: usuarioId });
    }

    // Actualizar un usuario segun ID
   // Actualizar un usuario según ID
async update(usuarioId, updatedFields) {
    return await this.model.findByIdAndUpdate(
        usuarioId,
        updatedFields,  // Aquí no es necesario el $set, ya que findByIdAndUpdate ya lo hace
        { new: true }
    );
}


    // Eliminar una propiedad segun ID
    async delete(usuarioId) {
        return await this.model.findByIdAndDelete({ _id: usuarioId });
    }
}

module.exports = UsuarioDaoMongo;
