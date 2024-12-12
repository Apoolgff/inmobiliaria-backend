const { Router } = require('express');
const { upload } = require('../../services/cloudinary'); // Importamos la configuración de Multer
const PublicacionController = require('../../controllers/publicacion.controller');

const publicacionRouter = Router();
const publicacionController = new PublicacionController();

// Rutas
publicacionRouter.post('/cuenta/:cid', upload.array('fotos', 10), publicacionController.createPublicacion);
publicacionRouter.get('/cuenta/:cid', upload.array('fotos', 10), publicacionController.getPublicacionesByUserId);
publicacionRouter.get('/', publicacionController.getPublicaciones);
publicacionRouter.get('/:pid', publicacionController.getPublicacionById);
publicacionRouter.put('/:pid', publicacionController.updatePublicacion);
publicacionRouter.delete('/:pid/cuentass/:cid', publicacionController.deletePublicacion);

module.exports = publicacionRouter;
