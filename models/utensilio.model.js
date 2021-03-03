const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const utensilioSchema = new Schema({
  codigo: { type: String, default: '', unique: true },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  marca: { type: String, required: true },
  restaurante: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
utensilioSchema.set('collection', 'utensilios');
utensilioSchema.plugin(setCodigo, { tabla: 'Utensilio' });
utensilioSchema.plugin(aumentaConsecutivo, { tabla: 'Utensilio' });
utensilioSchema.plugin(encrypt, { secret: process.env.SECRET });

const Utensilio = mongoose.model('Utensilio', utensilioSchema);

module.exports = Utensilio;
