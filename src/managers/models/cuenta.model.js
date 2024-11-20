const { Schema, model } = require('mongoose');

const CuentasCollection = 'Cuentas';

const UsuarioSchema = new Schema({
    apellido: { type: String, trim: true },
});

const InmobiliariaSchema = new Schema({
    razon_social: { type: String },
    rut: { type: String },
    direccion: { type: String },
});

const CuentaSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tipo: { type: String, required: true, enum: ['Usuario', 'Inmobiliaria'] },
    publicaciones: [{ type: Schema.Types.ObjectId, ref: 'Publicaciones' }],
    usuario: UsuarioSchema, //Subesquema
    inmobiliaria: InmobiliariaSchema, //Subesquema
    fecha_creacion: { type: Date, default: Date.now },
});


CuentaSchema.methods.obtenerDatosEspecificos = function () {
    return this.tipo === 'Usuario' ? this.usuario : this.inmobiliaria;
};

const cuentaModel = model(CuentasCollection, CuentaSchema);
module.exports = { cuentaModel }

