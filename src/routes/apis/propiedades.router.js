const { Router } = require('express');

const propiedadRouter = Router();

const PropiedadController = require('../../controllers/propiedad.controller')

const propiedadController = new PropiedadController()

//Crear Propiedad
propiedadRouter.post('/usuario/:uid', propiedadController.createPropiedad);
propiedadRouter.post('/inmobiliaria/:iid', propiedadController.createPropiedad);
propiedadRouter.get('/', propiedadController.getPropiedades);
propiedadRouter.put('/:pid', propiedadController.updatePropiedad);
propiedadRouter.delete('/:pid/usuarios/:uid', propiedadController.deletePropiedad);
propiedadRouter.delete('/:pid/inmobiliarias/:iid', propiedadController.deletePropiedad);


module.exports = propiedadRouter;
