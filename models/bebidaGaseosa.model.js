const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const bebidaGaseosaSchema = new Schema({
  codigo: { type: String, default: '' },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  restaurante: { type: String, required: true },
  descripcion: { type: String, required: true },
  foto: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  cantidad: { type: Number, required: true },
  marca: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
bebidaGaseosaSchema.set('collection', 'bebidasGaseosas');
bebidaGaseosaSchema.plugin(setCodigo, { tabla: 'BebidaGaseosa' });
bebidaGaseosaSchema.plugin(aumentaConsecutivo, { tabla: 'BebidaGaseosa' });
bebidaGaseosaSchema.plugin(encrypt, { secret: process.env.SECRET });

const BebidaGaseosa = mongoose.model('BebidaGaseosa', bebidaGaseosaSchema);

module.exports = BebidaGaseosa;
