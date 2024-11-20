const { CuentaRepository } = require("./cuenta.repository")
const { PublicacionRepository } = require('./publicacion.repository')


const cuentaService = new CuentaRepository()

const publicacionService = new PublicacionRepository()

module.exports = {
    cuentaService,
    publicacionService
};
