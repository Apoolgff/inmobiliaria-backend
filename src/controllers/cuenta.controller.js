const { cuentaService } = require('../repositories/services');
const { configObject } = require('../config/index');
const { createHash, isValidPassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/jwt');

class CuentaController {
    constructor() {
        this.cuentaService = cuentaService;
    }

    //Obtener la cuenta actual por el token
    getCuentaActual = async (req, res) => {
        try {
            const cuenta = await this.cuentaService.getCuentaById(req.user.userId);
            if (cuenta) {
                res.status(200).json(cuenta);
            } else {
                res.status(404).json({ message: 'Cuenta no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener la cuenta actual:', error);
            res.status(500).json({ message: 'Error al obtener la cuenta actual' });
        }
    };

    //Login de cuenta (Usuario o Inmobiliaria)
    loginCuenta = async (req, res) => {
        const { email, password } = req.body;

        try {
            const cuenta = await this.cuentaService.getCuentaBy({ email });
            if (!cuenta) {
                return res.status(404).json({ message: 'Cuenta no encontrada' });
            }

            const isMatch = await isValidPassword(password, cuenta.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            const token = generateToken(cuenta);
            res.cookie(configObject.cookie_name, token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000,
                sameSite: 'strict',
            });

            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    };

    //Logout de cuenta
    logoutCuenta = async (req, res) => {
        try {
            res.clearCookie(configObject.cookie_name);
            res.status(200).json({ message: 'Cierre de sesión exitoso' });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            res.status(500).json({ message: 'Error al cerrar sesión' });
        }
    };

    //Obtener todas las cuentas
    getCuentas = async (req, res) => {
        try {
            const cuentas = await this.cuentaService.getCuentas();
            res.status(200).json(cuentas);
        } catch (error) {
            console.error('Error al obtener cuentas:', error);
            res.status(500).json({ message: 'Error al obtener cuentas' });
        }
    };

    //Obtener una cuenta por filtro
    getCuentaBy = async (req, res) => {
        const filter = req.body;
        try {
            const cuenta = await this.cuentaService.getCuentaBy(filter);
            if (cuenta) {
                res.status(200).json(cuenta);
            } else {
                res.status(404).json({ message: 'Cuenta no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener cuenta:', error);
            res.status(500).json({ message: 'Error al obtener cuenta' });
        }
    };

    //Crear una nueva cuenta
    createCuenta = async (req, res) => {
        const { nombre, email, telefono, password, tipo, usuario, inmobiliaria, publicaciones } = req.body;

        const nuevaCuenta = {
            nombre,
            email,
            telefono,
            password: await createHash(password),
            tipo,
            publicaciones,
        };


        if (tipo === 'Usuario') {
            nuevaCuenta.usuario = usuario;
        } else if (tipo === 'Inmobiliaria') {
            nuevaCuenta.inmobiliaria = inmobiliaria;
        } else {
            return res.status(400).json({ message: 'Tipo de cuenta no válido' });
        }

        try {
            const cuentaCreada = await this.cuentaService.createCuenta(nuevaCuenta);
            res.status(201).json(cuentaCreada);
        } catch (error) {
            console.error('Error al crear cuenta:', error);
            res.status(500).json({ message: 'Error al crear cuenta' });
        }
    };

    //Actualizar una cuenta por ID
    updateCuenta = async (req, res) => {
        const { cid } = req.params;
        const updatedFields = req.body;

        try {
            const cuentaActualizada = await this.cuentaService.updateCuenta(cid, updatedFields);
            if (cuentaActualizada) {
                res.status(200).json(cuentaActualizada);
            } else {
                res.status(404).json({ message: 'Cuenta no encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar cuenta:', error);
            res.status(500).json({ message: 'Error al actualizar cuenta' });
        }
    };

    //Eliminar una cuenta por ID
    deleteCuenta = async (req, res) => {
        const { cid } = req.params;

        try {
            const cuentaEliminada = await this.cuentaService.deleteCuenta(cid);
            if (cuentaEliminada) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Cuenta no encontrada' });
            }
        } catch (error) {
            console.error('Error al eliminar cuenta:', error);
            res.status(500).json({ message: 'Error al eliminar cuenta' });
        }
    };
}

module.exports = CuentaController;
