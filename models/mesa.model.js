const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const consecutivoModel = require("./consecutivo.model")

const mesaSchema = new Schema({
  codigo: '',
  nombre: { type: String, required: true },
  numero: { type: Number, required: true },
  sillas: { type: Number, required: true },
  deleted: { type: Boolean, required: false }
}, {
  versionKey: false,
});

// Genera codigo en base a consecutivo
mesaSchema.pre("save", async function (next) {
  try {
    const mesa = this;
    this.wasNew = mesa.isNew;
    if (mesa.isNew) {
      const Consecutivo = await consecutivoModel.getByTable('Mesa');
      let { prefijo, valor } = Consecutivo;
      valor++
      mesa.codigo = prefijo + valor;
    }
    next();
  } catch (error) {
    console.log('Error' + error);
  }
});

// Aumenta valor de consecutivo a +1
mesaSchema.post('save', async function (doc, next) {
  try {
    if (this.wasNew) {
      const Consecutivo = await consecutivoModel.getByTable('Mesa');
      Consecutivo.valor++;
      Consecutivo.save();
    }
    next();
  } catch (error) {
    console.log('Error' + error);
  }
});

const Mesa = mongoose.model('Mesa', mesaSchema);

module.exports = Mesa;
