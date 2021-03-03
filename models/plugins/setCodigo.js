const consecutivoModel = require("../consecutivo.model");

module.exports = function setCodigoPlugin(schema, options) {
  // Genera codigo en base a consecutivo
  schema.pre("save", async function (next) {
    try {
      const elemento = this;
      this.wasNew = elemento.isNew;
      if (elemento.isNew) {
        const Consecutivo = await consecutivoModel.getByTable(options.tabla);
        let { prefijo, valor, tienePrefijo } = Consecutivo;
        valor++
        elemento.codigo = tienePrefijo ? (prefijo + valor) : valor
      }
      next();
    } catch (error) {
      console.log('Error' + error);
    }
  });
}
