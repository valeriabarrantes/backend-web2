const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const puestoSchema = new Schema({
  codigo: '',
  nombre: { type: String, required: true },
  rol: { type: String, required: true },
  interno: { type: Boolean, required: true },
  externo: { type: Boolean, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
puestoSchema.set('collection', 'puestos');
puestoSchema.plugin(setCodigo, {tabla: 'Puesto'});
puestoSchema.plugin(aumentaConsecutivo, {tabla: 'Puesto'});
puestoSchema.plugin(encrypt, { secret: process.env.SECRET });

const Puesto = mongoose.model('Puesto', puestoSchema);

module.exports = Puesto;
