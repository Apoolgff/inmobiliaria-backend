const InmobiliariaDaoMongo = require('../managers/inmobiliariaManagerMongo');

class InmobiliariaRepository {
    constructor() {
        this.dao = new InmobiliariaDaoMongo();
    }

    // Obtener todas los Inmobiliarias
    getInmobiliarias = async () => await this.dao.get();

    // Obtener Inmobiliarias con limites
    getInmobiliariasLimited = async ({ filter, options }) => await this.dao.getLimited({ filter, options });

    // Obtener un Inmobiliaria segun un filtro
    getInmobiliariaBy = async (filter) => await this.dao.getBy(filter);

    // Obtener un Inmobiliaria por ID
    getInmobiliariaById = async (inmobiliariaId) => await this.dao.getById(inmobiliariaId);

    // Crear un nuevo Inmobiliaria
    createInmobiliaria = async (inmobiliaria) => await this.dao.create(inmobiliaria);

    // Actualizar un Inmobiliaria segun ID
    updateInmobiliaria = async (iid, updatedFields) => await this.dao.update(iid, updatedFields);

    // Eliminar un Inmobiliaria segun ID
    deleteInmobiliaria = async (iid) => await this.dao.delete(iid);
}

module.exports = { InmobiliariaRepository };
