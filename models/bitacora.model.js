const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const bitacoraSchema = new Schema({
  codigo: { type: String, default: '' },
  fechaHora: { type: String, required: true },
  descripcion: { type: String, required: true },
  usuario: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
bitacoraSchema.set('collection', 'bitacora');
bitacoraSchema.plugin(setCodigo, { tabla: 'Bitacora' });
bitacoraSchema.plugin(aumentaConsecutivo, { tabla: 'Bitacora' });
bitacoraSchema.plugin(encrypt, { secret: process.env.SECRET });

const Bitacora = mongoose.model('Bitacora', bitacoraSchema);

module.exports = Bitacora;
