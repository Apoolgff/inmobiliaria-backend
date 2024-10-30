const { Schema, model, Types } = require('mongoose');
const usuariosCollection = 'Usuarios';

//AGREGAR TELEFONO
const UsuarioSchema = Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    telefono: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    publicaciones: [{ type: Types.ObjectId, ref: 'Publicaciones' }], 
    propiedades: [{ type: Types.ObjectId, ref: 'Propiedades' }], 
    fecha_creacion: { type: Date, default: Date.now }
});


UsuarioSchema.pre('find', function() {
    this.populate('publicaciones').populate('propiedades');
});

UsuarioSchema.pre('findOne', function() {
    this.populate('publicaciones').populate('propiedades');
});


const usuarioModel = model(usuariosCollection, UsuarioSchema);
module.exports = { usuarioModel };
