const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Utensilio = require('../models/utensilio.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const utensilios = await Utensilio.find();
    res.json(utensilios);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const cantidad = Number(req.body.cantidad);
    const descripcion = req.body.descripcion;
    const precio = Number(req.body.precio);
    const marca = req.body.marca;
    const restaurante = req.body.restaurante;
    const deleted = false;
    const nuevoUtensilio = new Utensilio({
      nombre,
      cantidad,
      descripcion,
      precio,
      marca,
      restaurante,
      deleted
    });
    await nuevoUtensilio.save();
    res.json('Utensilio agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const utensilio = await Utensilio.findById(req.params.id);
    res.json(utensilio);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Utensilio.findByIdAndDelete(req.params.id);
    res.json('Utensilio removido.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const utensilio = await Utensilio.findById(req.params.id);
    utensilio.nombre = req.body.nombre;
    utensilio.cantidad = Number(req.body.cantidad);
    utensilio.descripcion = req.body.descripcion;
    utensilio.precio = Number(req.body.precio);
    utensilio.marca = req.body.marca;
    utensilio.restaurante = req.body.restaurante;
    utensilio.save();
    res.json('Utensilio actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
