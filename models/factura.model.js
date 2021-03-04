const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setCodigo = require('./plugins/setCodigo');
const aumentaConsecutivo = require('./plugins/aumentaConsecutivo');
const encrypt = require('mongoose-encryption');

const facturaSchema = new Schema({
  codigo: { type: String, default: '' },
  fecha: { type: String, required: true },
  dineroRecibido: { type: Number, required: true },
  aperturaCaja: { type: Boolean, required: true },
  cierreCaja: { type: Boolean, required: true },
  descripcion: { type: String, required: true },
  restaurante: { type: String, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});
facturaSchema.set('collection', 'facturas');
facturaSchema.plugin(setCodigo, { tabla: 'Factura' });
facturaSchema.plugin(aumentaConsecutivo, { tabla: 'Factura' });
facturaSchema.plugin(encrypt, { secret: process.env.SECRET });

const Factura = mongoose.model('Factura', facturaSchema);

module.exports = Factura;
