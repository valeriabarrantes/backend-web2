const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encrypt = require('mongoose-encryption');

const consecutivoSchema = new Schema({
  codigo: { type: Number, required: true, bcrypt: true },
  tabla: { type: String, required: true },
  descripcion: { type: String, required: true },
  valor: { type: Number, required: true },
  tienePrefijo: { type: Boolean, required: false },
  prefijo: { type: String, required: false },
  deleted: { type: Boolean, required: false },
}, {
  versionKey: false
});
consecutivoSchema.set('collection', 'consecutivos');
consecutivoSchema.plugin(encrypt, { secret: process.env.SECRET });

consecutivoSchema.statics = {
  getAll: function () {
    return this.find().exec();
  },
  getByTable: async function (tabla) {
    const consecutivos = await this.getAll();
    const consecutivo = consecutivos.find(consecutivo => consecutivo.tabla == tabla);
    return this.findOne({ _id: consecutivo._id })
      .exec();
  }
}

const Consecutivo = mongoose.model('Consecutivo', consecutivoSchema);

module.exports = Consecutivo;
