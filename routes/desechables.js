const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Desechable = require('../models/desechable.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const desechables = await Desechable.find();
    res.json(desechables);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const cantidad = Number(req.body.cantidad);
    const restaurante = req.body.restaurante;
    const deleted = false;
    const nuevoDesechable = new Desechable({
      nombre,
      cantidad,
      restaurante,
      deleted
    });
    await nuevoDesechable.save();
    res.json('Desechable agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const desechable = await Desechable.findById(req.params.id);
    res.json(desechable);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Desechable.findByIdAndDelete(req.params.id);
    res.json('Desechable removido.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const desechable = await Desechable.findById(req.params.id);
    desechable.nombre = req.body.nombre;
    desechable.cantidad = Number(req.body.cantidad);
    desechable.restaurante = req.body.restaurante;
    desechable.tipo = req.body.tipo;
    desechable.save();
    res.json('Desechable actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
