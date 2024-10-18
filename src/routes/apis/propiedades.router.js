const { Router } = require('express');

const propiedadRouter = Router();

const PropiedadController = require('../../controllers/propiedad.controller')

const propiedadController = new PropiedadController()

//Crear Propiedad
propiedadRouter.post('/crear', propiedadController.createPropiedad);
propiedadRouter.get('/ver', propiedadController.getPropiedades);
propiedadRouter.put('/modificar/:pid', propiedadController.updatePropiedad);
propiedadRouter.delete('/eliminar/:pid', propiedadController.deletePropiedad);

module.exports = propiedadRouter;
