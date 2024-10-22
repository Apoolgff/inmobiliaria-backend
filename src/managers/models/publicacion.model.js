const { Schema, model, Types } = require('mongoose');

const publicacionesCollection = 'Publicaciones';

const PublicacionSchema = Schema({
    propiedad: { type: Types.ObjectId, ref: 'Propiedades', required: true }, 
    usuario: { type: Types.ObjectId, ref: 'Usuarios' }, 
    inmobiliaria: { type: Types.ObjectId, ref: 'Inmobiliarias' },
    tipo: { type: String, enum: ['alquiler', 'venta'], required: true },
    fecha_creacion: { type: Date, default: Date.now },
    tiempo_max_alquiler: { type: Number, required: function() { return this.tipo === 'alquiler'; } }, 
    precio_venta: { type: Number, required: function() { return this.tipo === 'venta'; } },
    precio_alquiler: { 
        valor: { type: Number, required: function() { return this.tipo === 'alquiler'; } },
        periodo: { type: String, enum: ['día', 'mes', 'año'], required: function() { return this.tipo === 'alquiler'; } }
    },
});

PublicacionSchema.pre('find', function() {
    this.populate('propiedad').populate('usuario').populate('inmobiliaria');
});

PublicacionSchema.pre('findOne', function() {
    this.populate('propiedad').populate('usuario').populate('inmobiliaria');
});

const publicacionModel = model(publicacionesCollection, PublicacionSchema);
module.exports = { publicacionModel };
