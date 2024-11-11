const jwt = require('jsonwebtoken');
const { configObject } = require('../config/index');

// Clave secreta para firmar el token (debe estar en tu archivo .env)
const JWT_SECRET = configObject.jwt_secret_key || 'your_secret_key'; 
const JWT_EXPIRATION = configObject.jwt_expiration_time || '1h'; // Expiración del token, por ejemplo '1h'

// Función para generar el JWT y almacenarlo en una cookie
const generateToken = (user) => {
    // Crea el JWT con el ID del usuario y otros datos si es necesario
    const payload = {
        userId: user._id,
        email: user.email,
        nombre: user.nombre,
    };

    // Firma el token con la clave secreta
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return token;
};

// Función para verificar el JWT en cada solicitud (verificación en cookies y encabezado)
const verifyToken = (req, res, next) => {
    // Intenta obtener el token de las cookies
    const tokenFromCookies = req.cookies[configObject.cookie_name];
    
    // Si no se encuentra el token en las cookies, intenta obtenerlo desde el encabezado
    const tokenFromHeader = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    // Si no hay token en las cookies ni en los encabezados, responde con un error
    const token = tokenFromCookies || tokenFromHeader;
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    // Verifica el token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.clearCookie(configObject.cookie_name); 
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        // Si el token es válido, agrega la información del usuario al objeto `req` para usarla en las siguientes rutas
        req.user = decoded;

        // Continúa con la ejecución de la siguiente función del middleware
        next();
    });
};

module.exports = {
    generateToken,
    verifyToken
};
