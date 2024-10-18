//const mongoose = require('mongoose');
const { Schema, model } = require('mongoose')

const PropiedadCollection ='Propiedad';

// Definir subesquema de Inmobiliaria
const InmobiliariaSchema = Schema({
    nombre: { type: String, required: true },
    codigo: { type: String },
    email: { type: String },
    direccion: { type: String },
    telefono: { type: String },
    celular: { type: String },
    sucursal: { type: Number },
    logo: { type: String }
});

// Definir subesquema de Broker
const BrokerSchema = Schema({
    id: { type: Number, default: 0 },
    nombre: { type: String },
    telefono: { type: String },
    email: { type: String },
    foto: { type: String }
});

// Definir subesquema de Ubicacion
const UbicacionSchema = Schema({
    departamento: { type: String },
    ciudad: { type: String },
    barrio: { type: String },
    distanciamarmetros: { type: Number },
    frentealmar: { type: String },
    direccion: { type: String },
    lat: { type: Number },
    lon: { type: Number }
});

// Definir subesquema de Caracteristicas
const CaracteristicasSchema = Schema({
    parrillero: { type: String },
    playroom: { type: String },
    mucamas: { type: String },
    servicioplaya: { type: String },
    tipoedificio: { type: String },
    asensores: { type: Number },
    piscina: { type: String },
    estacionamientovisitas: { type: String },
    sauna: { type: String },
    gimnasio: { type: String },
    totaldormitorios: { type: Number },
    banos: { type: Number },
    suites: { type: Number },
    cocina: { type: String },
    capacidadpersonas: { type: Number },
    cantidadcamas: { type: Number },
    equipamiento: { type: String },
    amenities: { type: String },
    gastoscomunes: { type: Number },
    monedagastos: { type: String },
    frecuenciagastos: { type: String },
    antiguedad: { type: Number },
    cochera: { type: String },
    superficiepropia: { type: Number },
    terrazabalcon: { type: String },
    vista: { type: String }
});

// Definir subesquema de Venta
const VentaSchema = Schema({
    precio: { type: Number },
    mda: { type: String },
    fechavigencia: { type: Date },
    permuta: { type: String },
    oferta: { type: String },
    financia: { type: String },
    renta: { type: Number },
    porcentajerenta: { type: Number },
    saldobanco: { type: Number }
});

// Definir subesquema de Alquiler
const AlquilerSchema = Schema({
    VigenciaAlquiler: { type: Date },
    PrecioPubliacionAlquiler: { type: Number },
    Febrero: { type: Number },
    FebreroQuincena1: { type: Number },
    FebreroQuincena2: { type: Number },
    CotizacionDolar: { type: Number },
    AceptaMascota: { type: String }
});

// Definir subesquema de Fotos
const FotoSchema = Schema({
    url: { type: String },
    descripcion: { type: String }
});

// Definir esquema principal de Propiedad
const PropiedadSchema = Schema({
    tipo: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    Inmobiliaria: InmobiliariaSchema,
    Broker: BrokerSchema,
    enVenta: { type: Boolean, default: false },
    enAlquiler: { type: Boolean, default: false },
    titulo: { type: String },
    descripcion: { type: String },
    Ubicacion: UbicacionSchema,
    Caracteristicas: CaracteristicasSchema,
    destacada: { type: Boolean, default: false },
    venta: VentaSchema,
    alquiler: AlquilerSchema,
    fotos: [FotoSchema],
    url: { type: String }
});

// Crear y exportar el modelo de Propiedad
const propiedadModel = model(PropiedadCollection, PropiedadSchema);
module.exports = {propiedadModel}
