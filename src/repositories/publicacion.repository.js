const PublicacionDaoMongo = require('../managers/publicacionManagerMongo');

class PublicacionRepository {
    constructor() {
        this.dao = new PublicacionDaoMongo();
    }

    //Obtener todas las publicaciones
    getPublicaciones = async () => await this.dao.get();

    //Obtener publicaciones con límites
    getPublicacionesLimited = async ({ filter, options }) => await this.dao.getLimited({ filter, options });

    //Obtener una publicacion por un filtro
    getPublicacionBy = async (filter) => await this.dao.getBy(filter);

    //Obtener una publicacion por un usuario
    getPublicacionesByUserId = async (filter) => await this.dao.getByUser(filter);

    //Obtener una publicacion por ID
    getPublicacionById = async (publicacionId) => await this.dao.getById(publicacionId);

    //Crear una nueva publicacion
    createPublicacion = async (publicacion) => await this.dao.create(publicacion);

    //Actualizar una publicacion por ID
    updatePublicacion = async (pid, updatedFields) => await this.dao.update(pid, updatedFields);

    //Eliminar una publicacion por ID
    deletePublicacion = async (pid) => await this.dao.delete(pid);
}

module.exports = { PublicacionRepository };
