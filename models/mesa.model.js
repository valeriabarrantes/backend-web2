const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mesaSchema = new Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    numero: { type: Number, required: true },
    sillas: { type: Number, required: true },
    deleted: { type: Boolean, required: false },
});

const Mesa = mongoose.model('Mesa', mesaSchema);

module.exports = Mesa;