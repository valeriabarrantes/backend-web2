const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Comestible = require('../models/comestible.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const comestibles = await Comestible.find();
    res.json(comestibles);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const cantidad = Number(req.body.cantidad);
    const tipo = req.body.tipo;
    const clase = req.body.clase;
    const linea = req.body.linea;
    const marca = req.body.marca;
    const unidadDeMedida = req.body.unidadDeMedida;
    const restaurante = req.body.restaurante;
    const deleted = false;
    const nuevoComestible = new Comestible({
      nombre,
      cantidad,
      tipo,
      clase,
      linea,
      marca,
      restaurante,
      unidadDeMedida,
      deleted
    });
    await nuevoComestible.save();
    res.json('Comestible agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const comestible = await Comestible.findById(req.params.id);
    res.json(comestible);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Comestible.findByIdAndDelete(req.params.id);
    res.json('Comestible removido.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const comestible = await Comestible.findById(req.params.id);
    comestible.nombre = req.body.nombre;
    comestible.cantidad = Number(req.body.cantidad);
    comestible.tipo = req.body.tipo;
    comestible.clase = req.body.clase;
    comestible.linea = req.body.linea;
    comestible.marca = req.body.marca;
    comestible.unidadDeMedida = req.body.unidadDeMedida;
    comestible.restaurante = req.body.restaurante;
    comestible.save();
    res.json('Comestible actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
