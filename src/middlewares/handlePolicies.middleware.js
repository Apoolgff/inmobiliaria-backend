const jwt = require('jsonwebtoken');
const { configObject } = require('../config/index')

exports.handlePolicies = policies => (req, res, next) => {
    //Verifica si la ruta es pública
    if (policies[0] === 'PUBLIC') {
        return next();
    }

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ status: 'error', error: 'Unauthorized' });
    }

    let user;
    try {
        user = jwt.verify(token, configObject.jwt_secret_key);
    } catch (error) {
        return res.status(401).send({ status: 'error', error: 'Unauthorized' });
    }

    //Verifica si el usuario es un administrador o un usuario normal
    if (policies.includes('ADMIN') && user.suscripcion.toUpperCase() === 'ADMIN') {
     
        req.user = user;
        return next();
    } else if (policies.includes('USER') && user.suscripcion.toUpperCase() === 'USER') {
 
        req.user = user;
        return next();
    } else if (policies.includes('PREMIUM') && user.suscripcion.toUpperCase() === 'PREMIUM') {
 
        req.user = user;
        return next();
    }
    else {

        return res.status(403).send({ status: 'error', error: 'No permissions' });
    }
};


