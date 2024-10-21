const { Schema, model, Types } = require('mongoose');
const inmobiliariasCollection = 'Inmobiliarias';

const InmobiliariaSchema = Schema({
    rut: { type: String, required: true, unique: true },
    razon_social: { type: String, required: true, trim: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    suscripcion: { type: String, enum: ['inmobiliaria'], required: true },
    publicaciones: [{ type: Types.ObjectId, ref: 'Publicaciones' }], // Referencia a publicaciones de la inmobiliaria
    propiedades: [{ type: Types.ObjectId, ref: 'Propiedad' }], // Referencia a propiedades publicadas
    fecha_creacion: { type: Date, default: Date.now }
});

// Middleware para poblar publicaciones y propiedades al hacer consultas
InmobiliariaSchema.pre('findOne', function() {
    this.populate('publicaciones').populate('propiedades');
});

const InmobiliariaModel = model(inmobiliariasCollection, InmobiliariaSchema);
module.exports = { InmobiliariaModel };
