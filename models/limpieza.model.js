const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const limpiezaSchema = new Schema({
  codigo: {type: String,default: ''},
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  tipo: { type: String, required: true },
  cantidadMedida: { type: Number, required: true },
  unidadDeMedida: { type: String, required: true },
  restaurante: { type: String, required: true },
  marca: { type: String, required: true },
  descripcion: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
limpiezaSchema.set('collection', 'limpieza');
limpiezaSchema.plugin(setCodigo, {tabla: 'Limpieza'});
limpiezaSchema.plugin(aumentaConsecutivo, {tabla: 'Limpieza'});
limpiezaSchema.plugin(encrypt, { secret: process.env.SECRET });

const Limpieza = mongoose.model('Limpieza', limpiezaSchema);

module.exports = Limpieza;
