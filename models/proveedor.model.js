const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const proveedorSchema = new Schema({
  codigo: { type: String, default: '' },
  cedula: { type: String, required: true, unique: true },
  fechaIngreso: { type: String, required: true },
  nombre: { type: String, required: true },
  primerApellido: { type: String, required: true },
  segundoApellido: { type: String, required: true },
  productos: { type: String, required: true },
  direccion: { type: String, required: true },
  celular: { type: String, required: true },
  fax: { type: String, required: false },
  telefonoOficina: { type: String, required: false },
  correo: { type: String, required: true },
  foto: { type: String, required: false },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
proveedorSchema.set('collection', 'proveedores');
proveedorSchema.plugin(setCodigo, { tabla: 'Proveedor' });
proveedorSchema.plugin(aumentaConsecutivo, { tabla: 'Proveedor' });
proveedorSchema.plugin(encrypt, { secret: process.env.SECRET });

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;
