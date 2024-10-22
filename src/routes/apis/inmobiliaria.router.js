const { Router } = require('express');

const inmobiliariaRouter = Router();

const InmobiliariaController = require('../../controllers/inmobiliaria.controller')

const inmobiliariaController = new InmobiliariaController()

//Crear Propiedad
inmobiliariaRouter.post('/', inmobiliariaController.createInmobiliaria);
inmobiliariaRouter.get('/', inmobiliariaController.getInmobiliarias);
inmobiliariaRouter.put('/:iid', inmobiliariaController.updateInmobiliaria);
inmobiliariaRouter.delete('/:iid', inmobiliariaController.deleteInmobiliaria);

module.exports = inmobiliariaRouter;