const { Router } = require('express');

const cuentaRouter = Router();

const CuentaController = require('../../controllers/cuenta.controller')

const cuentaController = new CuentaController()
const { verifyToken } = require('../../utils/jwt');


cuentaRouter.get('/current', verifyToken, cuentaController.getCuentaActual);
cuentaRouter.post('/', cuentaController.createCuenta);
cuentaRouter.get('/', cuentaController.getCuentas);
cuentaRouter.get('/:cid', cuentaController.getCuentaBy);
cuentaRouter.put('/:cid', cuentaController.updateCuenta);
cuentaRouter.delete('/:cid', cuentaController.deleteCuenta);

cuentaRouter.post('/login', cuentaController.loginCuenta); // Login de cuenta
cuentaRouter.post('/logout', cuentaController.logoutCuenta); // Logout de cuenta

module.exports = cuentaRouter;
