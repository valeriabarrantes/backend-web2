const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const rolSchema = new Schema({
  codigo: { type: String, default: '' },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
rolSchema.set('collection', 'roles');
rolSchema.plugin(setCodigo, { tabla: 'Rol' });
rolSchema.plugin(aumentaConsecutivo, { tabla: 'Rol' });
rolSchema.plugin(encrypt, { secret: process.env.SECRET });

const Rol = mongoose.model('Rol', rolSchema);

module.exports = Rol;
