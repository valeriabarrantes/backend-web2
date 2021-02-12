const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const mesaSchema = new Schema({
  codigo: {type: String,default: ''},
  nombre: { type: String, required: true },
  numero: { type: Number, required: true },
  sillas: { type: Number, required: true },
  restaurante: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
mesaSchema.set('collection', 'mesas');
mesaSchema.plugin(setCodigo, {tabla: 'Mesa'});
mesaSchema.plugin(aumentaConsecutivo, {tabla: 'Mesa'});
mesaSchema.plugin(encrypt, { secret: process.env.SECRET });

const Mesa = mongoose.model('Mesa', mesaSchema);

module.exports = Mesa;
