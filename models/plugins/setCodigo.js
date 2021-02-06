const consecutivoModel = require("../consecutivo.model");

module.exports = function setCodigoPlugin(schema, options) {
  // Genera codigo en base a consecutivo
  schema.pre("save", async function (next) {
    try {
      const elemento = this;
      this.wasNew = elemento.isNew;
      if (elemento.isNew) {
        const Consecutivo = await consecutivoModel.getByTable(options.tabla);
        let { prefijo, valor } = Consecutivo;
        valor++
        elemento.codigo = prefijo + valor;
      }
      next();
    } catch (error) {
      console.log('Error' + error);
    }
  });
}
