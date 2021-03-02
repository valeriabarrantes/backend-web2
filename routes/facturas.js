const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Factura = require('../models/factura.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const facturas = await Factura.find();
    res.json(facturas);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const fecha = req.body.fecha;
    const dineroRecibido = Number(req.body.dineroRecibido);
    const aperturaCaja = Number(req.body.aperturaCaja);
    const cierreCaja = Number(req.body.cierreCaja);
    const descripcion = req.body.descripcion;
    const restaurante = req.body.restaurante;
    const deleted = false;
    const nuevaFactura = new Factura({
      fecha,
      dineroRecibido,
      aperturaCaja,
      cierreCaja,
      descripcion,
      restaurante,
      deleted
    });
    await nuevaFactura.save();
    res.json('Factura agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const factura = await Factura.findById(req.params.id);
    res.json(factura);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Factura.findByIdAndDelete(req.params.id);
    res.json('Factura removida.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const factura = await Factura.findById(req.params.id);
    factura.fecha = req.body.fecha;
    factura.dineroRecibido = Number(req.body.dineroRecibido);
    factura.aperturaCaja = Number(req.body.aperturaCaja);
    factura.cierreCaja = Number(req.body.cierreCaja);
    factura.descripcion = req.body.descripcion;
    factura.restaurante = req.body.restaurante;
    factura.save();
    res.json('Factura actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
