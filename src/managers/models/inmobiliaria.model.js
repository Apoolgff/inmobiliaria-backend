const { Schema, model, Types } = require('mongoose');
const inmobiliariasCollection = 'Inmobiliarias';

const InmobiliariaSchema = Schema({
    nombre: { type: String, required: true, trim: true },
    rut: { type: String, required: true, unique: true },
    razon_social: { type: String, required: true, trim: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    descripcion: { type: String },
    publicaciones: [{ type: Types.ObjectId, ref: 'Publicaciones' }], 
    propiedades: [{ type: Types.ObjectId, ref: 'Propiedades' }], 
    fecha_creacion: { type: Date, default: Date.now }
});

InmobiliariaSchema.pre('find', function() {
    this.populate('publicaciones').populate('propiedades');
});

InmobiliariaSchema.pre('findOne', function() {
    this.populate('publicaciones').populate('propiedades');
});

const inmobiliariaModel = model(inmobiliariasCollection, InmobiliariaSchema);
module.exports = { inmobiliariaModel };
