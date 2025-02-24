const jwt = require('jsonwebtoken');
const { configObject } = require('../config/index');

const JWT_SECRET = configObject.jwt_secret_key || 'your_secret_key'; 
const JWT_EXPIRATION = configObject.jwt_expiration_time || '1h'; 

const generateToken = (user) => {
    const payload = {
        userId: user._id,
        email: user.email,
        nombre: user.nombre,
        tipo: user.tipo
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return token;
};

//verificael JWT en cada solicitud (verificacion en cookies y encabezado)
const verifyToken = (req, res, next) => {
    const tokenFromCookies = req.cookies[configObject.cookie_name];
    
    const tokenFromHeader = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    const token = tokenFromCookies || tokenFromHeader;
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    //Verifica el token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.clearCookie(configObject.cookie_name); 
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        req.user = decoded;


        next();
    });
};

module.exports = {
    generateToken,
    verifyToken
};
