const { Router } = require('express');

const usuarioRouter = Router();

const UsuarioController = require('../../controllers/usuario.controller')

const usuarioController = new UsuarioController()

//Crear Propiedad
usuarioRouter.post('/', usuarioController.createUsuario);
usuarioRouter.get('/', usuarioController.getUsuarios);
usuarioRouter.put('/:uid', usuarioController.updateUsuario);
usuarioRouter.delete('/:uid', usuarioController.deleteUsuario);

module.exports = usuarioRouter;
