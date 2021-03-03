const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const vinoSchema = new Schema({
  codigo: { type: String, default: '', unique: true },
  nombre: { type: String, required: true, unique: true },
  cosecha: { type: String, required: true },
  precioUnitario: { type: Number, required: false },
  precioBotella: { type: Number, required: false },
  cantidad: { type: Number, required: true },
  descripcion: { type: String, required: true },
  marca: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  restaurante: { type: String, required: true },
  foto: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
vinoSchema.set('collection', 'vinos');
vinoSchema.plugin(setCodigo, { tabla: 'Vino' });
vinoSchema.plugin(aumentaConsecutivo, { tabla: 'Vino' });
vinoSchema.plugin(encrypt, { secret: process.env.SECRET });

const Vino = mongoose.model('Vino', vinoSchema);

module.exports = Vino;
