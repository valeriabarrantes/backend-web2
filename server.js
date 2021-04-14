const express = require('express'); // NodeJS server framework
const cors = require('cors'); // Posibilidad de habilitar URLs a aplicaciones externas
const mongoose = require('mongoose'); // Conecta con MongoDB
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexion con MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Conexión con Mongo DB establecida exitosamente');
});

// Agregar las rutas del API
const mesasRouter = require('./routes/mesas');
const consecutivosRouter = require('./routes/consecutivos');
const paisesRouter = require('./routes/paises');
const marcasRouter = require('./routes/marcas');
const restaurantesRouter = require('./routes/restaurantes');
const rolesRouter = require('./routes/roles');
const puestosRouter = require('./routes/puestos');
const empleadosRouter = require('./routes/empleados');
const usuariosRouter = require('./routes/usuarios');
const bebidasCalientesRouter = require('./routes/bebidasCalientes');
const bebidasHeladasRouter = require('./routes/bebidasHeladas');
const bebidasGaseosasRouter = require('./routes/bebidasGaseosas');
const licoresRouter = require('./routes/licores');
const vinosRouter = require('./routes/vinos');
const especialidadesRouter = require('./routes/especialidades');
const unidadesDeMedidaRouter = require('./routes/unidadesDeMedida');
const buffetRouter = require('./routes/buffet');
const comestibleRouter = require('./routes/comestibles');
const tecnologiaRouter = require('./routes/tecnologia');
const desechableRouter = require('./routes/desechables');
const utensilioRouter = require('./routes/utensilios');
const limpiezaRouter = require('./routes/limpieza');
const bitacoraRouter = require('./routes/bitacora');
const facturaRouter = require('./routes/facturas');
const clienteRouter = require('./routes/clientes');
const proveedorRouter = require('./routes/proveedores');
const productoRouter = require('./routes/productos');
const platilloRouter = require('./routes/platillos');
app.use('/mesas', mesasRouter);
app.use('/consecutivos', consecutivosRouter);
app.use('/paises', paisesRouter);
app.use('/marcas', marcasRouter);
app.use('/restaurantes', restaurantesRouter);
app.use('/roles', rolesRouter);
app.use('/puestos', puestosRouter);
app.use('/empleados', empleadosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/bebidasCalientes', bebidasCalientesRouter);
app.use('/bebidasHeladas', bebidasHeladasRouter);
app.use('/bebidasGaseosas', bebidasGaseosasRouter);
app.use('/licores', licoresRouter);
app.use('/vinos', vinosRouter);
app.use('/especialidades', especialidadesRouter);
app.use('/unidadesDeMedida', unidadesDeMedidaRouter);
app.use('/buffet', buffetRouter);
app.use('/comestibles', comestibleRouter);
app.use('/tecnologia', tecnologiaRouter);
app.use('/desechables', desechableRouter);
app.use('/utensilios', utensilioRouter);
app.use('/limpieza', limpiezaRouter);
app.use('/bitacora', bitacoraRouter);
app.use('/facturas', facturaRouter);
app.use('/clientes', clienteRouter);
app.use('/proveedores', proveedorRouter);
app.use('/productos', productoRouter);
app.use('/platillos', platilloRouter);

app.use('/resources',express.static(__dirname + '/public'));

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor está corriendo en el puerto: ${port}`);
});
