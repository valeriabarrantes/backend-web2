const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Cliente = require('../models/cliente.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const montoPago = Number(req.body.montoPago);
    const detalle = req.body.detalle;
    const fecha = req.body.fecha;
    const reservacion = Boolean(req.body.reservacion);
    const restaurante = req.body.restaurante;
    const barra = Boolean(req.body.barra);
    const mesa = req.body.mesa;
    const horaEntrada = req.body.horaEntrada;
    const horaSalida = req.body.horaSalida;
    const deleted = false;
    const nuevoCliente = new Cliente({
      nombre,
      montoPago,
      detalle,
      fecha,
      reservacion,
      restaurante,
      barra,
      mesa,
      horaEntrada,
      horaSalida,
      deleted
    });
    await nuevoCliente.save();
    res.json('Cliente agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    res.json(cliente);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json('Cliente removido.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    cliente.nombre = req.body.nombre;
    cliente.montoPago = Number(req.body.montoPago);
    cliente.detalle = req.body.detalle;
    cliente.fecha = req.body.fecha;
    cliente.reservacion = Boolean(req.body.reservacion);
    cliente.restaurante = req.body.restaurante;
    cliente.barra = Boolean(req.body.barra);
    cliente.mesa = req.body.mesa;
    cliente.horaEntrada = req.body.horaEntrada;
    cliente.horaSalida = req.body.horaSalida;
    cliente.save();
    res.json('Cliente actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
