const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Limpieza = require('../models/limpieza.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const limpieza = await Limpieza.find();
    res.json(limpieza);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const cantidad = Number(req.body.cantidad);
    const tipo = req.body.tipo;
    const cantidadMedida = Number(req.body.cantidadMedida);
    const unidadDeMedida = req.body.unidadDeMedida;
    const restaurante = req.body.restaurante;
    const marca = req.body.marca;
    const descripcion = req.body.descripcion;
    const deleted = false;
    const nuevoLimpieza = new Limpieza({
      nombre,
      cantidad,
      tipo,
      cantidadMedida,
      unidadDeMedida,
      restaurante,
      marca,
      descripcion,
      deleted
    });
    await nuevoLimpieza.save();
    res.json('Articulo de Limpieza agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const limpieza = await Limpieza.findById(req.params.id);
    res.json(limpieza);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Limpieza.findByIdAndDelete(req.params.id);
    res.json('Articulo de Limpieza removido.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const limpieza = await Limpieza.findById(req.params.id);
    limpieza.nombre = req.body.nombre;
    limpieza.cantidad = Number(req.body.cantidad);
    limpieza.tipo = req.body.tipo;
    limpieza.cantidadMedida = Number(req.body.cantidadMedida);
    limpieza.unidadDeMedida = req.body.unidadDeMedida;
    limpieza.restaurante = req.body.restaurante;
    limpieza.marca = req.body.marca;
    limpieza.descripcion = req.body.descripcion;
    limpieza.save();
    res.json('Articulo de Limpieza actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
