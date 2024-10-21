const { Router } = require('express');

const propiedadRouter = Router();

const PropiedadController = require('../../controllers/propiedad.controller')

const propiedadController = new PropiedadController()

//Crear Propiedad
propiedadRouter.post('/propiedades', propiedadController.createPropiedad);
propiedadRouter.get('/propiedades', propiedadController.getPropiedades);
propiedadRouter.put('/propiedades/:pid', propiedadController.updatePropiedad);
propiedadRouter.delete('/propiedades/:pid', propiedadController.deletePropiedad);

module.exports = propiedadRouter;
