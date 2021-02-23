const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const licorSchema = new Schema({
  codigo: {type: String,default: ''},
  nombre: { type: String, required: true },
  precioUnitario: { type: Number, required: false },
  precioBotella: { type: Number, required: false },
  cantidad: { type: Number, required: true },
  descripción: { type: String, required: true },
  foto: { type: String, required: true },
  marca: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  restaurante: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
licorSchema.set('collection', 'licores');
licorSchema.plugin(setCodigo, {tabla: 'Licor'});
licorSchema.plugin(aumentaConsecutivo, {tabla: 'Licor'});
licorSchema.plugin(encrypt, { secret: process.env.SECRET });

const Licor = mongoose.model('Licor', licorSchema);

module.exports = Licor;
