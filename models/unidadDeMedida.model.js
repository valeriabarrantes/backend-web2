const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const unidadDeMedidaSchema = new Schema({
  codigo: { type: String, default: '', unique: true },
  unidad: { type: String, required: true },
  escala: { type: String, required: false },
  simbolo: { type: String, required: false },
  simbologia: { type: String, required: false },
  detalle: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
unidadDeMedidaSchema.set('collection', 'unidadesDeMedida');
unidadDeMedidaSchema.plugin(setCodigo, { tabla: 'UnidadDeMedida' });
unidadDeMedidaSchema.plugin(aumentaConsecutivo, { tabla: 'UnidadDeMedida' });
unidadDeMedidaSchema.plugin(encrypt, { secret: process.env.SECRET });

const UnidadDeMedida = mongoose.model('UnidadDeMedida', unidadDeMedidaSchema);

module.exports = UnidadDeMedida;
