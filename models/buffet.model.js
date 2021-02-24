const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const buffetSchema = new Schema({
  codigo: {type: String,default: ''},
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  tipo: { type: String, required: true },
  foto: { type: String, required: true },
  unidadDeMedida: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
buffetSchema.set('collection', 'buffet');
buffetSchema.plugin(setCodigo, {tabla: 'Buffet'});
buffetSchema.plugin(aumentaConsecutivo, {tabla: 'Buffet'});
buffetSchema.plugin(encrypt, { secret: process.env.SECRET });

const Buffet = mongoose.model('Buffet', buffetSchema);

module.exports = Buffet;
