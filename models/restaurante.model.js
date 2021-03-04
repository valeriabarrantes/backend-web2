const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const restauranteSchema = new Schema({
  codigo: { type: String, default: '' },
  nombre: { type: String, required: true },
  especialidad: { type: String, required: true },
  direccion: { type: String, required: true },
  cantidadClientes: { type: Number, required: true },
  telefono: { type: String, required: true },
  activo: { type: Boolean, required: false },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
restauranteSchema.set('collection', 'restaurantes');
restauranteSchema.plugin(setCodigo, { tabla: 'Restaurante' });
restauranteSchema.plugin(aumentaConsecutivo, { tabla: 'Restaurante' });
restauranteSchema.plugin(encrypt, { secret: process.env.SECRET });

const Restaurante = mongoose.model('Restaurante', restauranteSchema);

module.exports = Restaurante;
