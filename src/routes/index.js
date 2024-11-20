const { Router } = require('express');
const router = Router();
const publicacionesRouter = require('./apis/publicacion.router');
const cuentasRouter = require('./apis/cuenta.router');


router.use('/publicacion', publicacionesRouter);
router.use('/cuentas', cuentasRouter)


module.exports = router;
