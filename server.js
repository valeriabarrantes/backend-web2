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
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Conexión con Mongo DB establecida exitosamente');
});

// Agregar las rutas del API
const mesasRouter = require('./routes/mesas');
const consecutivosRouter = require('./routes/consecutivos');
const paisesRouter = require('./routes/paises');
app.use('/mesas', mesasRouter);
app.use('/consecutivos', consecutivosRouter);
app.use('/paises', paisesRouter);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor está corriendo en el puerto: ${port}`);
});
