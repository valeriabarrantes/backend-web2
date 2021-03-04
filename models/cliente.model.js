const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const clienteSchema = new Schema({
  codigo: { type: String, default: '' },
  nombre: { type: String, required: true },
  montoPago: { type: Number, required: true },
  detalle: { type: String, required: true },
  fecha: { type: String, required: true },
  reservacion: { type: Boolean, required: false },
  restaurante: { type: String, required: true },
  barra: { type: Boolean, required: false },
  mesa: { type: String, required: true },
  horaEntrada: { type: String, required: true },
  horaSalida: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
clienteSchema.set('collection', 'clientes');
clienteSchema.plugin(setCodigo, { tabla: 'Cliente' });
clienteSchema.plugin(aumentaConsecutivo, { tabla: 'Cliente' });
clienteSchema.plugin(encrypt, { secret: process.env.SECRET });

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
