const { Router } = require('express');
const router = Router();
const propiedadesRouter = require('./apis/propiedades.router');

router.use('/', propiedadesRouter); // Esto debería funcionar

module.exports = router;
