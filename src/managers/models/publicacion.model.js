const { Schema, model, Types } = require('mongoose');
const publicacionesCollection = 'Publicaciones';

const PublicacionSchema = Schema({
    propiedad: { type: Types.ObjectId, ref: 'Propiedad', required: true }, // Referencia a la propiedad
    usuario: { type: Types.ObjectId, ref: 'Usuarios' }, // Puede ser de un usuario
    inmobiliaria: { type: Types.ObjectId, ref: 'Inmobiliarias' }, // O de una inmobiliaria
    tipo: { type: String, enum: ['alquiler', 'venta'], required: true },
    fecha_creacion: { type: Date, default: Date.now },
    tiempo_max_alquiler: { type: Number, required: function() { return this.tipo === 'alquiler'; } }, // Solo requerido si es alquiler
});

// Middleware para poblar propiedad, usuario, e inmobiliaria
PublicacionSchema.pre('findOne', function() {
    this.populate('propiedad').populate('usuario').populate('inmobiliaria');
});

const PublicacionModel = model(publicacionesCollection, PublicacionSchema);
module.exports = { PublicacionModel };
