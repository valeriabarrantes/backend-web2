const router = require('express').Router();
let Puesto = require('../models/puesto.model');

router.get('/', async (req, res) => {
  try {
    const puestos = await Puesto.find();
    res.json(puestos);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const rol = req.body.rol;
    const interno = Boolean(req.body.interno);
    const externo = Boolean(req.body.externo);
    const deleted = false;
    const nuevoPuesto = new Puesto({
      nombre,
      rol,
      interno,
      externo,
      deleted
    });
    await nuevoPuesto.save();
    res.json('Puesto agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const puesto = await Puesto.findById(req.params.id);
    res.json(puesto);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Puesto.findByIdAndDelete(req.params.id);
    res.json('Puesto removido totalmente.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const puesto = await Puesto.findById(req.params.id);
    puesto.nombre = req.body.nombre;
    puesto.rol = req.body.rol;
    puesto.interno = Boolean(req.body.interno);
    puesto.externo = Boolean(req.body.externo);
    puesto.save();
    res.json('Puesto actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const puesto = await Puesto.findById(req.params.id);
    puesto.deleted = true;
    puesto.save();
    res.json('Puesto removido parcialmente.')
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
