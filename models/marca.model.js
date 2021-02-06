const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const marcaSchema = new Schema({
  codigo: '',
  nombreMarca: { type: String, required: true },
  descripcionMarca: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  fotoMarca: { type: String, required: true },
  cedulaEmpresa: { type: String, required: true },
  nombreEmpresa: { type: String, required: true },
  detalleEmpresa: { type: String, required: true },
  telefonoEmpresa: { type: String, required: true },
  fotoEmpresa: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
marcaSchema.set('collection', 'marcas');
marcaSchema.plugin(setCodigo, {tabla: 'Marca'});
marcaSchema.plugin(aumentaConsecutivo, {tabla: 'Marca'});
marcaSchema.plugin(encrypt, { secret: process.env.SECRET });

const Marca = mongoose.model('Marca', marcaSchema);

module.exports = Marca;
