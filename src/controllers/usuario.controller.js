const { usuarioService } = require('../repositories/services');
const { configObject } = require ('../config/index')
const { createHash, isValidPassword } = require("../utils/hashPassword")
const { generateToken } = require('../utils/jwt'); // Ajusta la ruta según tu estructura de archivos


class UsuarioController {
    constructor() {
        this.usuarioService = usuarioService;
    }

    // usuario.controller.js

    getUsuarioActual = async (req, res) => {
        try {
            const usuario = await this.usuarioService.getUsuarioById(req.user.userId); // Usa el userId del token
            if (usuario) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener el usuario actual:', error);
            res.status(500).json({ message: 'Error al obtener el usuario actual' });
        }
    };


    // Login de usuario
    loginUsuario = async (req, res) => {
        const { email, password } = req.body;

        try {
            const usuario = await this.usuarioService.getUsuarioBy({ email });
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Verificar que la contraseña sea correcta
            const isMatch = await isValidPassword(password, usuario.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            // Crear el JWT
            //const payload = { uid: usuario._id, email: usuario.email };
            const token = generateToken(usuario);
            

            // Guardar el token en una cookie
            res.cookie(configObject.cookie_name, token, {
                httpOnly: true,
                secure: false, //process.env.NODE_ENV === 'production', // Solo en producción usar https
                maxAge: 3600000,
                sameSite: 'strict', // Protección CSRF
            });

            res.status(200).json({ message: 'Inicio de sesión exitoso' });

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    };

    // Logout de usuario
    logoutUsuario = async (req, res) => {
        try {
            // Eliminar la cookie del token
            res.clearCookie(configObject.cookie_name);
            res.status(200).json({ message: 'Cierre de sesión exitoso' });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            res.status(500).json({ message: 'Error al cerrar sesión' });
        }
    };

    // Obtener todos los usuarios
    getUsuarios = async (req, res) => {
        try {
            const usuarios = await this.usuarioService.getUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    };

    // Obtener usuarios con limites (paginacion o filtrado)
    getUsuariosLimited = async (req, res) => {
        const { filter, options } = req.body; // Asegúrate de que el cliente envíe el cuerpo correctamente
        try {
            const usuarios = await this.usuarioService.getUsuariosLimited({ filter, options });
            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Error al obtener usuarios limitados:', error);
            res.status(500).json({ message: 'Error al obtener usuarios limitados' });
        }
    };

    // Obtener un usuario segun un filtro
    getUsuarioBy = async (req, res) => {
        const filter = req.body; // req.params o req.query segun necesidad
        try {
            const usuario = await this.usuarioService.getUsuarioBy(filter);
            if (usuario) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ message: 'Error al obtener usuario' });
        }
    };

    // Obtener un usuario por ID
    getUsuarioById = async (req, res) => {
        const { uid } = req.params;
        try {
            const usuario = await this.usuarioService.getUsuarioById(uid);
            if (usuario) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            res.status(500).json({ message: 'Error al obtener usuario por ID' });
        }
    };

    // Crear un nuevo usuario
    createUsuario = async (req, res) => {
        const { nombre, apellido, email, telefono, password, publicaciones, propiedades } = req.body;

        // Crear el objeto de usuario
        const nuevoUsuario = {
            nombre,
            apellido,
            email,
            telefono,
            password: await createHash(password),
            publicaciones,
            propiedades
        };

        try {
            const usuarioCreado = await this.usuarioService.createUsuario(nuevoUsuario);
            res.status(201).json(usuarioCreado);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Error al crear usuario' });
        }
    };

    // Actualizar un usuario segun ID
    updateUsuario = async (req, res) => {
        const { uid } = req.params;
        const updatedFields = req.body; 
        try {
            const usuarioActualizado = await this.usuarioService.updateUsuario(uid, updatedFields);
            if (usuarioActualizado) {
                res.status(200).json(usuarioActualizado);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ message: 'Error al actualizar usuario' });
        }
    };

    // Eliminar un usuario segun ID
    deleteUsuario = async (req, res) => {
        const { uid } = req.params;
        try {
            const usuarioEliminado = await this.usuarioService.deleteUsuario(uid);
            if (usuarioEliminado) {
                res.status(204).send(); 
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ message: 'Error al eliminar usuario' });
        }
    };
}

module.exports = UsuarioController;
