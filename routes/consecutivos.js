const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Consecutivo = require('../models/consecutivo.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const consecutivos = await Consecutivo.find();
    res.json(consecutivos);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const codigo = req.body.codigo;
    const tabla = req.body.tabla;
    const descripcion = req.body.descripcion;
    const valor = Number(req.body.valor);
    const tienePrefijo = Boolean(req.body.tienePrefijo);
    const prefijo = req.body.prefijo;
    const deleted = false;
    const nuevoConsecutivo = new Consecutivo({
      codigo,
      tabla,
      descripcion,
      valor,
      tienePrefijo,
      prefijo,
      deleted
    });
    await nuevoConsecutivo.save();
    res.json('Consecutivo agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const consecutivo = await Consecutivo.findById(req.params.id);
    res.json(consecutivo);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Consecutivo.findByIdAndDelete(req.params.id);
    res.json('Consecutivo removido totalmente.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const consecutivo = await Consecutivo.findById(req.params.id);
    consecutivo.tabla = req.body.tabla;
    consecutivo.descripcion = req.body.descripcion;
    consecutivo.valor = Number(req.body.valor);
    consecutivo.tienePrefijo = Boolean(req.body.tienePrefijo);
    consecutivo.prefijo = req.body.prefijo;
    consecutivo.save();
    res.json('Consecutivo actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/delete/:id', verifyToken, async (req, res) => {
  try {
    const consecutivo = await Consecutivo.findById(req.params.id);
    consecutivo.deleted = true;
    consecutivo.save();
    res.json('Consecutivo removido parcialmente.')
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
