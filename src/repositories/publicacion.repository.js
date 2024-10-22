const PublicacionDaoMongo = require('../managers/publicacionManagerMongo');

class PublicacionRepository {
    constructor() {
        this.dao = new PublicacionDaoMongo();
    }

    // Obtener todas las publicaciones
    getPublicacion = async () => await this.dao.get();

    // Obtener publicaciones con limites
    getPublicacionLimited = async ({ filter, options }) => await this.dao.getLimited({ filter, options });

    // Obtener una publicacion segun un filtro
    getPublicacionBy = async (filter) => await this.dao.getBy(filter);

    // Obtener una publicacion por ID
    getPublicacionById = async (publicacionId) => await this.dao.getById(publicacionId);

    // Crear una nueva publicacion
    createPublicacion = async (publicacion) => await this.dao.create(publicacion);

    // Actualizar una publicacion segun ID
    updatePublicacion = async (pid, updatedFields) => await this.dao.update(pid, updatedFields);

    // Eliminar una publicacion segun ID
    deletePublicacion = async (pid) => await this.dao.delete(pid);
}

module.exports = { PublicacionRepository };
