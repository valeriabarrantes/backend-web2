const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const bebidaHeladaSchema = new Schema({
  codigo: { type: String, default: '', unique: true },
  nombre: { type: String, required: true, unique: true },
  precio: { type: Number, required: true },
  restaurante: { type: String, required: true },
  descripcion: { type: String, required: true },
  foto: { type: String, required: true },
  ingredientes: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
bebidaHeladaSchema.set('collection', 'bebidasHeladas');
bebidaHeladaSchema.plugin(setCodigo, { tabla: 'BebidaHelada' });
bebidaHeladaSchema.plugin(aumentaConsecutivo, { tabla: 'BebidaHelada' });
bebidaHeladaSchema.plugin(encrypt, { secret: process.env.SECRET });

const BebidaHelada = mongoose.model('BebidaHelada', bebidaHeladaSchema);

module.exports = BebidaHelada;
