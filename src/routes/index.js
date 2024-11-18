const { Router } = require('express');
const router = Router();
const publicacionesRouter = require('./apis/publicacion.router');
const usuariosRouter = require('./apis/usuarios.router');
const inmobiliariaRouter = require('./apis/inmobiliaria.router')
//const publicacionRouter = require('./apis/publicacion.router')

router.use('/publicacion', publicacionesRouter);
router.use('/usuarios', usuariosRouter)
router.use('/inmobiliaria', inmobiliariaRouter)
//router.use('/publicacion', publicacionRouter)

module.exports = router;
