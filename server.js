const express = require('express'); // NodeJS server framework
const cors = require('cors'); // Posibilidad de habilitar URLs a aplicaciones externas
const mongoose = require('mongoose'); // Conecta con MongoDB

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Conexión con Mongo DB establecida exitosamente');
})

// Agregar las rutas
const mesasRouter = require('./routes/mesas');
app.use('/mesas', mesasRouter);

app.listen(port, () => {
  console.log(`Servidor está corriendo en el puerto: ${port}`);
});