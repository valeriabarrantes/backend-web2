const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const consecutivoSchema = new Schema({
  tabla: { type: String, required: true },
  descripcion: { type: String, required: true },
  valor: { type: Number, required: true },
  tienePrefijo: { type: Boolean, required: false },
  prefijo: { type: String, required: false },
  deleted: { type: Boolean, required: false },
}, {
  versionKey: false
});
consecutivoSchema.plugin(AutoIncrement, { inc_field: 'codigo', id: 'consecutivos_seq' });

consecutivoSchema.statics = {
  getByTable: function (tabla) {
    return this.findOne({ tabla: tabla })
      .exec();
  }
}

const Consecutivo = mongoose.model('Consecutivo', consecutivoSchema);

module.exports = Consecutivo;
