const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let UnidadDeMedida = require('../models/unidadDeMedida.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const unidadesDeMedida = await UnidadDeMedida.find();
    res.json(unidadesDeMedida);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const unidad = req.body.unidad;
    const escala = req.body.escala;
    const simbolo = req.body.simbolo;
    const simbologia = req.body.simbologia;
    const detalle = req.body.detalle;
    const deleted = false;
    const nuevaUnidadDeMedida = new UnidadDeMedida({
      unidad,
      escala,
      simbolo,
      simbologia,
      detalle,
      deleted
    });
    await nuevaUnidadDeMedida.save();
    res.json('UnidadDeMedida agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const unidadDeMedida = await UnidadDeMedida.findById(req.params.id);
    res.json(unidadDeMedida);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await UnidadDeMedida.findByIdAndDelete(req.params.id);
    res.json('Unidad de Medida removida.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const unidadDeMedida = await UnidadDeMedida.findById(req.params.id);
    unidadDeMedida.unidad = req.body.unidad;
    unidadDeMedida.escala = req.body.escala;
    unidadDeMedida.simbolo = req.body.simbolo;
    unidadDeMedida.simbologia = req.body.simbologia;
    unidadDeMedida.detalle = req.body.detalle;
    unidadDeMedida.save();
    res.json('Unidad de Medida actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
