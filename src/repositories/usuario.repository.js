const UsuarioDaoMongo = require('../managers/usuarioManagerMongo');

class UsuarioRepository {
    constructor() {
        this.dao = new UsuarioDaoMongo();
    }

    // Obtener todas los usuarios
    getUsuarios = async () => await this.dao.get();

    // Obtener usuarios con limites
    getUsuariosLimited = async ({ filter, options }) => await this.dao.getLimited({ filter, options });

    // Obtener un usuario segun un filtro
    getUsuarioBy = async (filter) => await this.dao.getBy(filter);

    // Obtener un usuario por ID
    getUsuarioById = async (usuarioId) => await this.dao.getById(usuarioId);

    // Crear un nuevo usuario
    createUsuario = async (usuario) => await this.dao.create(usuario);

    // Actualizar un usuario segun ID
    updateUsuario = async (uid, updatedFields) => await this.dao.update(uid, updatedFields);

    // Eliminar un usuario segun ID
    deleteUsuario = async (uid) => await this.dao.delete(uid);
}

module.exports = { UsuarioRepository };
