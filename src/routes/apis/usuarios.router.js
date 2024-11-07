const { Router } = require('express');

const usuarioRouter = Router();

const UsuarioController = require('../../controllers/usuario.controller')

const usuarioController = new UsuarioController()
const { verifyToken } = require('../../utils/jwt');

//Crear Propiedad
usuarioRouter.get('/current', verifyToken, usuarioController.getUsuarioActual);
usuarioRouter.post('/', usuarioController.createUsuario);
usuarioRouter.get('/', usuarioController.getUsuarios);
usuarioRouter.get('/:uid', usuarioController.getUsuarioById);
usuarioRouter.put('/:uid', usuarioController.updateUsuario);
usuarioRouter.delete('/:uid', usuarioController.deleteUsuario);

usuarioRouter.post('/login', usuarioController.loginUsuario); // Login de usuario
usuarioRouter.post('/logout', usuarioController.logoutUsuario); // Logout de usuario

module.exports = usuarioRouter;
