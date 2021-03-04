const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const usuarioSchema = new Schema({
  codigo: { type: String, default: '' },
  nombre: { type: String, required: true },
  primerApellido: { type: String, required: false },
  segundoApellido: { type: String, required: false },
  telefonoFijo: { type: String, required: false },
  telefonoCelular: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  administradorSistema: { type: Boolean, required: false },
  administradorSeguridad: { type: Boolean, required: false },
  administradorRestaurante: { type: Boolean, required: false },
  administradorCuentas: { type: Boolean, required: false },
  contrasena: { type: String, required: true, select: false },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
usuarioSchema.set('collection', 'usuarios');
usuarioSchema.plugin(setCodigo, { tabla: 'Usuario' });
usuarioSchema.plugin(aumentaConsecutivo, { tabla: 'Usuario' });
usuarioSchema.plugin(encrypt, { secret: process.env.SECRET });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
