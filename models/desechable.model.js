const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const desechableSchema = new Schema({
  codigo: { type: String, default: '' },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  restaurante: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
desechableSchema.set('collection', 'desechables');
desechableSchema.plugin(setCodigo, { tabla: 'Desechable' });
desechableSchema.plugin(aumentaConsecutivo, { tabla: 'Desechable' });
desechableSchema.plugin(encrypt, { secret: process.env.SECRET });

const Desechable = mongoose.model('Desechable', desechableSchema);

module.exports = Desechable;
