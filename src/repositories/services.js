//const PropiedadDaoMongo = require('../managers/propiedadManagerMongo');
//const { PropiedadRepository } = require('./propiedad.repository')
const { UsuarioRepository } = require("./usuario.repository")
const { InmobiliariaRepository } = require('./inmobiliaria.repository')
const { PublicacionRepository } = require('./publicacion.repository')

//const propiedadService = new PropiedadRepository()
const usuarioService = new UsuarioRepository()
const inmobiliariaService = new InmobiliariaRepository()
const publicacionService = new PublicacionRepository()

module.exports = {
    //propiedadService,
    usuarioService,
    inmobiliariaService,
    publicacionService
};
