const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const tecnologiaSchema = new Schema({
  codigo: { type: String, default: '', unique: true },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  restaurante: { type: String, required: true },
  marca: { type: String, required: true },
  descripcion: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
tecnologiaSchema.set('collection', 'tecnologia');
tecnologiaSchema.plugin(setCodigo, { tabla: 'Tecnologia' });
tecnologiaSchema.plugin(aumentaConsecutivo, { tabla: 'Tecnologia' });
tecnologiaSchema.plugin(encrypt, { secret: process.env.SECRET });

const Tecnologia = mongoose.model('Tecnologia', tecnologiaSchema);

module.exports = Tecnologia;
