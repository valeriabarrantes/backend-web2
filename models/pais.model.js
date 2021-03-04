const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const paisSchema = new Schema({
  codigo: { type: String, default: '' },
  nombre: { type: String, required: true, unique: true },
  imagen: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
paisSchema.set('collection', 'paises');
paisSchema.plugin(setCodigo, { tabla: 'Pais' });
paisSchema.plugin(aumentaConsecutivo, { tabla: 'Pais' });
paisSchema.plugin(encrypt, { secret: process.env.SECRET });

const Pais = mongoose.model('Pais', paisSchema);

module.exports = Pais;
