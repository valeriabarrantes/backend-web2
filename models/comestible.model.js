const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const comestibleSchema = new Schema({
  codigo: {type: String,default: ''},
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  tipo: { type: String, required: true },
  clase: { type: String, required: true },
  linea: { type: String, required: true },
  marca: { type: String, required: true },
  restaurante: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
comestibleSchema.set('collection', 'comestibles');
comestibleSchema.plugin(setCodigo, {tabla: 'Comestible'});
comestibleSchema.plugin(aumentaConsecutivo, {tabla: 'Comestible'});
comestibleSchema.plugin(encrypt, { secret: process.env.SECRET });

const Comestible = mongoose.model('Comestible', comestibleSchema);

module.exports = Comestible;
