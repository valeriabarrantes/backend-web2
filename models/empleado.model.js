const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const empleadoSchema = new Schema({
  codigo: {type: String,default: ''},
  cedula: { type: String, required: true },
  nombre: { type: String, required: true },
  primerApellido: { type: String, required: false },
  segundoAppelido: { type: String, required: false },
  telefono1: { type: String, required: true },
  telefono2: { type: String, required: false },
  puesto: { type: String, required: true },
  restaurante: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  foto: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
empleadoSchema.set('collection', 'empleados');
empleadoSchema.plugin(setCodigo, {tabla: 'Empleado'});
empleadoSchema.plugin(aumentaConsecutivo, {tabla: 'Empleado'});
empleadoSchema.plugin(encrypt, { secret: process.env.SECRET });

const Empleado = mongoose.model('Empleado', empleadoSchema);

module.exports = Empleado;
