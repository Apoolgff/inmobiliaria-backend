const { Router } = require('express');

const publicacionRouter = Router();

const PublicacionController = require('../../controllers/publicacion.controller')

const publicacionController = new PublicacionController()

//Crear publicacion
publicacionRouter.post('/usuario/:uid', publicacionController.createPublicacion);
publicacionRouter.post('/inmobiliaria/:iid', publicacionController.createPublicacion);
publicacionRouter.get('/usuario/:uid', publicacionController.getPublicacionesByUserId);
publicacionRouter.get('/', publicacionController.getPublicaciones);
publicacionRouter.get('/:pid', publicacionController.getPublicacionById);
publicacionRouter.put('/:pid', publicacionController.updatePublicacion);
publicacionRouter.delete('/:pid/usuarios/:uid', publicacionController.deletePublicacion);
publicacionRouter.delete('/:pid/inmobiliarias/:iid', publicacionController.deletePublicacion);


module.exports = publicacionRouter;
