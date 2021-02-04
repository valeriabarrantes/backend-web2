const consecutivoModel = require("../consecutivo.model");

module.exports = function aumentaConsecutivoPlugin(schema, options) {
  // Aumenta valor de consecutivo a +1
  schema.post('save', async function (doc, next) {
    try {
      if (this.wasNew) {
        const Consecutivo = await consecutivoModel.getByTable(options.tabla);
        Consecutivo.valor++;
        Consecutivo.save();
      }
      next();
    } catch (error) {
      console.log('Error' + error);
    }
  });
}
