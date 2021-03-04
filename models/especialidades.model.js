const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const especialidadSchema = new Schema({
  codigo: { type: String, default: '' },
  nombre: { type: String, required: true, unique: true },
  ingredientes: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: false },
  detalle: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
especialidadSchema.set('collection', 'especialidades');
especialidadSchema.plugin(setCodigo, { tabla: 'Especialidad' });
especialidadSchema.plugin(aumentaConsecutivo, { tabla: 'Especialidad' });
especialidadSchema.plugin(encrypt, { secret: process.env.SECRET });

const Especialidad = mongoose.model('Especialidad', especialidadSchema);

module.exports = Especialidad;
