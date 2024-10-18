const PropiedadDaoMongo = require('../managers/propiedadManagerMongo'); // Sin destructuración
const { PropiedadRepository } = require('./propiedad.repository');

const propiedadService = new PropiedadRepository(); // Aquí instancias el repositorio sin pasar un argumento

module.exports = {
    propiedadService,
};
