const { usuarioService } = require('../repositories/services');

class UsuarioController {
    constructor() {
        this.usuarioService = usuarioService;
    }

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
            password,
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
