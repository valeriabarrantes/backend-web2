const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Restaurante = require('../models/restaurante.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const restaurantes = await Restaurante.find();
    res.json(restaurantes);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const especialidad = req.body.especialidad;
    const direccion = req.body.direccion;
    const cantidadClientes = Number(req.body.cantidadClientes);
    const telefono = req.body.telefono;
    const activo = Boolean(req.body.activo);
    const deleted = false;
    const nuevoRestaurante = new Restaurante({
      nombre,
      especialidad,
      direccion,
      cantidadClientes,
      telefono,
      activo,
      deleted
    });
    await nuevoRestaurante.save();
    res.json('Restaurante agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const restaurante = await Restaurante.findById(req.params.id);
    res.json(restaurante);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Restaurante.findByIdAndDelete(req.params.id);
    res.json('Restaurante removido totalmente.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const restaurante = await Restaurante.findById(req.params.id);
    restaurante.nombre = req.body.nombre;
    restaurante.especialidad = req.body.especialidad;
    restaurante.direccion = req.body.direccion;
    restaurante.cantidadClientes = Number(req.body.cantidadClientes);
    restaurante.telefono = req.body.telefono;
    restaurante.activo = Boolean(req.body.activo);
    restaurante.save();
    res.json('Restaurante actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/delete/:id', verifyToken, async (req, res) => {
  try {
    const restaurante = await Restaurante.findById(req.params.id);
    restaurante.deleted = true;
    restaurante.save();
    res.json('Restaurante removido parcialmente.')
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
