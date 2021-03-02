const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Bitacora = require('../models/bitacora.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const bitacora = await Bitacora.find();
    res.json(bitacora);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const fechaHora = req.body.fechaHora;
    const descripcion = req.body.descripcion;
    const usuario = req.body.usuario;
    const deleted = false;
    const nuevaBitacora = new Bitacora({
      fechaHora,
      descripcion,
      usuario,
      deleted
    });
    await nuevaBitacora.save();
    res.json('Bitacora agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const bitacora = await Bitacora.findById(req.params.id);
    res.json(bitacora);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Bitacora.findByIdAndDelete(req.params.id);
    res.json('Bitacora removida.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const bitacora = await Bitacora.findById(req.params.id);
    bitacora.fechaHora = req.body.fechaHora;
    bitacora.descripcion = req.body.descripcion;
    bitacora.usuario = req.body.usuario;
    bitacora.save();
    res.json('Bitacora actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
