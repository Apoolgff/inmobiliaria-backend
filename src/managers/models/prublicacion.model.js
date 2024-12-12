const { Schema, model, Types } = require('mongoose');

const PublicacionCollection = 'Publicaciones';

// Sub-Esquemas
const InmobiliariaSchema = Schema({
  nombre: { type: String, default: null },
  codigo: { type: String, default: null },
  email: { type: String, default: null },
  direccion: { type: String, default: null },
  telefono: { type: String, default: null },
  celular: { type: String, default: null },
  sucursal: { type: Number, default: null },
  logo: { type: String, default: null }
});

const BrokerSchema = Schema({
  id: { type: Number, default: 0 },
  nombre: { type: String, default: null },
  telefono: { type: String, default: null },
  email: { type: String, default: null },
  foto: { type: String, default: null }
});

const UbicacionSchema = Schema({
  departamento: { type: String, default: null },
  ciudad: { type: String, default: null },
  barrio: { type: String, default: null },
  distanciamarmetros: { type: Number, default: null },
  frentealmar: { type: String, default: null },
  direccion: { type: String, default: null },
  lat: { type: Number, default: null },
  lon: { type: Number, default: null }
});

const CaracteristicasSchema = new Schema({
  vista: { type: String, default: null },
  distanciamarmetros: { type: Number, default: null },
  frentealmar: { type: String, default: null },
  tenencia: { type: String, default: null },
  monedacontribucion: { type: String, default: null },
  contribucioninmobiliaria: { type: Number, default: null },
  monedaprimaria: { type: String, default: null },
  impuestoprimaria: { type: Number, default: null },
  youtube: { type: String, default: null },
  matterport: { type: String, default: null },

  //Terreno
  superficie: { type: String, default: null },
  frente: { type: String, default: null },
  fondo: { type: String, default: null },
  lateral: { type: String, default: null },
  esquina: { type: String, default: null },
  arbolado: { type: String, default: null },
  divisible: { type: String, default: null },
  sobreruta: { type: String, default: null },
  luz: { type: String, default: null },
  agua: { type: String, default: null },
  saneamiento: { type: String, default: null },
  formaterreno: { type: String, default: null },
  accesocampo: { type: String, default: null },
  fot: { type: String, default: null },
  subzona: { type: String, default: null },
  aptoph: { type: String, default: null },
  supeficieedificable: { type: String, default: null },
  cantidadpisos: { type: String, default: null },
  alambrado: { type: String, default: null },
  alto: { type: String, default: null },
  monedaprimaria: { type: String, default: null },
  impuestoprimaria: { type: String, default: null },

  //Apartamento
  parrillero: { type: String, default: null },
  playroom: { type: String, default: null },
  mucamas: { type: String, default: null },
  servicioplaya: { type: String, default: null },
  tipoedificio: { type: String, default: null },
  asensores: { type: Number, default: null },
  piscina: { type: String, default: null },
  estacionamientovisitas: { type: String, default: null },
  sauna: { type: String, default: null },
  gimnasio: { type: String, default: null },
  canchas: { type: String, default: null },
  vigilancia: { type: String, default: null },
  numeropiso: { type: Number, default: null },
  aptosxpiso: { type: Number, default: null },
  totaldormitorios: { type: Number, default: null },
  mediodormitorio: { type: Number, default: null },
  banos: { type: Number, default: null },
  suites: { type: Number, default: null },
  toilettes: { type: Number, default: null },
  cocina: { type: String, default: null },
  living: { type: String, default: null },
  comedor: { type: String, default: null },
  livingcomedor: { type: String, default: null },
  capacidadpersonas: { type: Number, default: null },
  cantidadcamas: { type: Number, default: null },
  caracteristicas: { type: String, default: null },
  equipamiento: { type: String, default: null },
  comodidades: { type: String, default: null },
  amenities: { type: String, default: null },
  frecuenciacontribucion: { type: Number, default: null },
  frecuenciaprimaria: { type: Number, default: null },
  gastoscomunes: { type: Number, default: null },
  monedagastos: { type: String, default: null },
  frecuenciagastos: { type: String, default: null },
  antiguedad: { type: Number, default: null },
  dependenciaservicio: { type: String, default: null },
  banoservicio: { type: String, default: null },
  estufalena: { type: String, default: null },
  cochera: { type: String, default: null },
  garage: { type: String, default: null },
  estacionamiento: { type: String, default: null },
  estado: { type: String, default: null },
  calefaccion: { type: String, default: null },
  superficietotal: { type: Number, default: null },
  superficiepropia: { type: Number, default: null },
  superficiecubierta: { type: Number, default: null },
  superficiesemicubierta: { type: Number, default: null },
  superficiebalcon: { type: Number, default: null },
  baulera: { type: String, default: null },
  lavadero: { type: String, default: null },
  EsPH: { type: String, default: null },
  muebles: { type: String, default: null },
  amoblado: { type: String, default: null },
  amovred: { type: String, default: null },
  terrazabalcon: { type: String, default: null },
  comedordiario: { type: String, default: null },
  orientacion: { type: String, default: null },
  disposicion: { type: String, default: null },
  idedificio: { type: Number, default: null },
  fondoreserva: { type: Number, default: null },
  monedafondo: { type: String, default: null },
  vigenciafondo: { type: Number, default: null },

  //Casa
  tipocasa: { type: String, default: null },
  superficieterreno: { type: Number, default: null },
  superficieedificado: { type: Number, default: null },
  cantidadplantas: { type: Number, default: null },
  paredes: { type: String, default: null },
  pisos: { type: String, default: null },
  techo: { type: String, default: null },
  fechaconstruccion: { type: Number, default: null },
  alarma: { type: String, default: null },

  //Chacra 
  zonas: { type: String, default: null },
  forestacion: { type: String, default: null },
  aguadas: { type: String, default: null },
  instalaciones: { type: String, default: null },
  galpones: { type: String, default: null },
  casapersonal: { type: String, default: null },
  cursoagua: { type: String, default: null },
  tajamar: { type: String, default: null },
  riego: { type: String, default: null },
  invernaculos: { type: String, default: null },
  alambrados: { type: String, default: null },
  canada: { type: String, default: null },
  arroyo: { type: String, default: null },
  costario: { type: String, default: null },
  pozoagua: { type: String, default: null },
  monte: { type: String, default: null },
  embarcadero: { type: String, default: null },
  potreros: { type: String, default: null },
  camaras: { type: String, default: null },
  preciohectareas: { type: Number, default: null },
  enventa: { type: Number, default: null },
  enalquiler: { type: Number, default: null },

  //Local 
  fechamodificado: { type: Date, default: null },
  metrosentrepiso: { type: Number, default: null },
  metrossubsuelo: { type: Number, default: null },
  ubicacion: { type: String, default: null },
  idealpara: { type: String, default: null },
  tipo: { type: Number, default: null },
});

const VentaSchema = Schema({
  precio: { type: Number, default: null },
  mda: { type: String, default: null },
  fechavigencia: { type: Date, default: null },
  permuta: { type: String, default: null },
  oferta: { type: String, default: null },
  financia: { type: String, default: null },
  renta: { type: Number, default: null },
  porcentajerenta: { type: Number, default: null },
  saldobanco: { type: Number, default: null }
});

const AlquilerSchema = Schema({
  VigenciaAlquiler: { type: Date, default: null },
  PrecioPubliacionAlquiler: { type: Number, default: null }, 
  Enero: { type: Number, default: null },
  EneroQuincena1: { type: Number, default: null },
  EneroQuincena2: { type: Number, default: null },
  Febrero: { type: Number, default: null },
  FebreroQuincena1: { type: Number, default: null },
  FebreroQuincena2: { type: Number, default: null },
  Reveion: { type: Number, default: null },
  Carnaval: { type: Number, default: null },
  SemanaSanta: { type: Number, default: null },
  AnualPesos: { type: Number, default: null },
  InvernalPesos: { type: Number, default: null },
  AnualDolares: { type: Number, default: null },
  PeriodoPrecioAlqAnual: { type: String, default: null },
  AnualTestigo: { type: Boolean, default: false },
  CotizacionDolar: { type: Number, default: null },
  InvernalDolares: { type: Number, default: null },
  Diciembre: { type: Number, default: null },
  DiciembreQuincena1: { type: Number, default: null },
  DiciembreQuincena2: { type: Number, default: null },
  Marzo: { type: Number, default: null },
  MarzoQuincena1: { type: Number, default: null },
  MarzoQuincena2: { type: Number, default: null },
  Temporada: { type: Boolean, default: false },
  AceptaMascota: { type: Boolean, default: false },
  AceptaFumador: { type: Boolean, default: false },
  AceptaNinos: { type: Boolean, default: false },
  GDeposito: { type: Boolean, default: false },
  GPropiedad: { type: Boolean, default: false },
  GAnda: { type: Boolean, default: false },
  GPorto: { type: Boolean, default: false },
  GCGN: { type: Boolean, default: false },
  GMVOTMA: { type: Boolean, default: false },
  GSura: { type: Boolean, default: false },
  GLUC: { type: Boolean, default: false },
  GCIncluidos: { type: Boolean, default: false }
});

const FotoSchema = Schema({
  url: { type: String, default: null },
  descripcion: { type: String, default: '' }
});

// Publicación Schema
const PublicacionSchema = Schema({
  propietario: {
    type: Schema.Types.ObjectId,
    ref: 'Cuentas', 
    default: null
  },
  propietarioTipo: {
    type: String,
    enum: ['Usuarios', 'Inmobiliarias'],
    default: null
  },
  tipo: { type: String, required: true, default: null },
  id: { type: String, required: true, unique: true, default: null },
  Inmobiliaria: InmobiliariaSchema,
  Broker: BrokerSchema,
  enVenta: { type: Boolean, default: false },
  enAlquiler: { type: Boolean, default: false },
  titulo: { type: String, default: null },
  descripcion: { type: String, default: null },
  Ubicacion: UbicacionSchema,
  Caracteristicas: CaracteristicasSchema,
  destacada: { type: Boolean, default: false },
  venta: VentaSchema,
  alquiler: AlquilerSchema,
  fotos: [FotoSchema],
  url: { type: String, default: null }
});

PublicacionSchema.pre('findOne', function () {
  this.populate({ path: 'propietario', select: 'nombre email telefono tipo usuario inmobiliaria' });
});

const publicacionModel = model(PublicacionCollection, PublicacionSchema);
module.exports = { publicacionModel };
