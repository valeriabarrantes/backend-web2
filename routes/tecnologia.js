const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Tecnologia = require('../models/tecnologia.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const tecnologia = await Tecnologia.find();
    res.json(tecnologia);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const cantidad = Number(req.body.cantidad);
    const precio = Number(req.body.precio);
    const restaurante = req.body.restaurante;
    const marca = req.body.marca;
    const descripcion = req.body.descripcion;
    const deleted = false;
    const nuevaTecnologia = new Tecnologia({
      nombre,
      cantidad,
      precio,
      restaurante,
      marca,
      descripcion,
      deleted
    });
    await nuevaTecnologia.save();
    res.json('Tecnologia agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const tecnologia = await Tecnologia.findById(req.params.id);
    res.json(tecnologia);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Tecnologia.findByIdAndDelete(req.params.id);
    res.json('Tecnologia removida.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const tecnologia = await Tecnologia.findById(req.params.id);
    tecnologia.nombre = req.body.nombre;
    tecnologia.cantidad = Number(req.body.cantidad);
    tecnologia.precio = Number(req.body.precio);
    tecnologia.restaurante = req.body.restaurante;
    tecnologia.marca = req.body.marca;
    tecnologia.descripcion = req.body.descripcion;
    tecnologia.save();
    res.json('Tecnologia actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
