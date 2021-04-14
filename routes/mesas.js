const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Mesa = require('../models/mesa.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const mesas = await Mesa.find();
    res.json(mesas);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const numero = Number(req.body.numero);
    const sillas = Number(req.body.sillas);
    const restaurante = req.body.restaurante;
    const status = "LIBRE";
    const deleted = false;
    const nuevaMesa = new Mesa({
      nombre,
      numero,
      sillas,
      restaurante,
      status,
      deleted
    });
    await nuevaMesa.save();
    res.json('Mesa agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const mesa = await Mesa.findById(req.params.id);
    res.json(mesa);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Mesa.findByIdAndDelete(req.params.id);
    res.json('Mesa removida.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const mesa = await Mesa.findById(req.params.id);
    mesa.nombre = req.body.nombre;
    mesa.numero = Number(req.body.numero);
    mesa.sillas = Number(req.body.sillas);
    mesa.restaurante = req.body.restaurante;
    mesa.status = req.body.status ? req.body.status : mesa.status;
    mesa.save();
    res.json('Mesa actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
