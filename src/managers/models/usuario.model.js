const { Schema, model, Types } = require('mongoose');

const usuarioCollection = "Usuario"

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  nacimiento:{
    type: Date,
    required: true,
    trim: true
  },
  propiedades: {
    type: Types.ObjectId, ref: 'Propiedad',
  },
  rol: {
    type: String,
    required: true
  },
  documents: [{
    name: { type: String },
    reference: { type: String }
  }],
  last_connection: {
    type: Date,
    default: Date.now
  },
  profile: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: Boolean,
    default: false
  }
})

UsuarioSchema.pre('findOne', function(){
  this.populate('propiedades')
})

const usuarioModel = model(usuarioCollection, UsersSchema)

module.exports = {usuarioModel}
