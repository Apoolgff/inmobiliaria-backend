const { Schema, model, Types } = require('mongoose');
const usuariosCollection = 'Usuarios';

const UsuarioSchema = Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    suscripcion: { type: String, enum: ['plata', 'oro', 'inmobiliaria'], required: true },
    publicaciones: [{ type: Types.ObjectId, ref: 'Publicaciones' }], // Referencia a publicaciones del usuario
    propiedades: [{ type: Types.ObjectId, ref: 'Propiedad' }], // Referencia a propiedades publicadas
    fecha_creacion: { type: Date, default: Date.now }
});

// Middleware para poblar publicaciones y propiedades al hacer consultas
UsuarioSchema.pre('findOne', function() {
    this.populate('publicaciones').populate('propiedades');
});

const UsuarioModel = model(usuariosCollection, UsuarioSchema);
module.exports = { UsuarioModel };
