const CuentaDaoMongo = require('../managers/cuentaManagerModel');

class CuentaRepository {
    constructor() {
        this.dao = new CuentaDaoMongo();
    }

    //Obtener todas las cuentas
    getCuentas = async () => await this.dao.get();

    //Obtener cuentas con filtros y opciones 
    getCuentasLimited = async ({ filter, options }) => await this.dao.getLimited({ filter, options });

    //Obtener una cuenta por un filtro
    getCuentaBy = async (filter) => await this.dao.getBy(filter);

    //Obtener una cuenta por ID
    getCuentaById = async (cuentaId) => await this.dao.getById(cuentaId);

    //Crear una nueva cuenta
    createCuenta = async (cuenta) => await this.dao.create(cuenta);

    //Actualizar una cuenta por ID
    updateCuenta = async (cuentaId, updatedFields) => await this.dao.update(cuentaId, updatedFields);

    //Eliminar una cuenta por ID
    deleteCuenta = async (cuentaId) => await this.dao.delete(cuentaId);
}

module.exports = { CuentaRepository };
