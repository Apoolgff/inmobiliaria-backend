const { Router } = require('express');
const router = Router();
const propiedadesRouter = require('./apis/propiedades.router');
const usuariosRouter = require('./apis/usuarios.router');
const inmobiliariaRouter = require('./apis/inmobiliaria.router')
const publicacionRouter = require('./apis/publicacion.router')

router.use('/propiedades', propiedadesRouter);
router.use('/usuarios', usuariosRouter)
router.use('/inmobiliaria', inmobiliariaRouter)
router.use('/publicacion', publicacionRouter)

module.exports = router;
