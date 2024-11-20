const { cuentaModel } = require('./models/cuenta.model');

class CuentaDaoMongo {
    constructor() {
        this.model = cuentaModel;
    }

    //Crear una nueva Cuenta
    async create(cuenta) {
        return await this.model.create(cuenta);
    }

    //Mostrar todas las Cuentas
    async get() {
        return await this.model.find();
    }

    //Obtener cuentas con paginación o límites
    async getLimited({ filter, options }) {
        return await this.model.paginate(filter, options); 
    }

    //Mostrar una cuenta por un filtro
    async getBy(filter) {
        return await this.model.findOne(filter);
    }

    //Obtener una cuenta por ID
    async getById(cuentaId) {
        return await this.model.findById({ _id: cuentaId });
    }

    //Actualizar una cuenta por ID
    async update(cuentaId, updatedFields) {
        return await this.model.findByIdAndUpdate(
            cuentaId,
            updatedFields, 
            { new: true } 
        );
    }

    //Eliminar una cuenta por ID
    async delete(cuentaId) {
        return await this.model.findByIdAndDelete({ _id: cuentaId });
    }
}

module.exports = CuentaDaoMongo;
