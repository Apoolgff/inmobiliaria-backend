const { Router } = require('express');

const publicacionRouter = Router();

const PublicacionController = require('../../controllers/publicacion.controller')

const publicacionController = new PublicacionController()


publicacionRouter.post('/cuenta/:cid', publicacionController.createPublicacion);
publicacionRouter.get('/cuenta/:cid', publicacionController.getPublicacionesByUserId);
publicacionRouter.get('/', publicacionController.getPublicaciones);
publicacionRouter.get('/:pid', publicacionController.getPublicacionById);
publicacionRouter.put('/:pid', publicacionController.updatePublicacion);
publicacionRouter.delete('/:pid/cuentass/:cid', publicacionController.deletePublicacion);



module.exports = publicacionRouter;
