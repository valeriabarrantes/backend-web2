const router = require('express').Router();
let Mesa = require('../models/mesa.model');

router.get('/', async (req, res) => {
  try {
    const mesas = await Mesa.find();
    res.json(mesas);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const numero = Number(req.body.numero);
    const sillas = Number(req.body.sillas);
    const deleted = false;
    const nuevaMesa = new Mesa({
      nombre,
      numero,
      sillas,
      deleted
    });
    await nuevaMesa.save();
    res.json('Mesa agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const mesa = await Mesa.findById(req.params.id);
    res.json(mesa);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Mesa.findByIdAndDelete(req.params.id);
    res.json('Mesa removida totalmente.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const mesa = await Mesa.findById(req.params.id);
    mesa.nombre = req.body.nombre;
    mesa.numero = Number(req.body.numero);
    mesa.sillas = Number(req.body.sillas);
    mesa.save();
    res.json('Mesa actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const mesa = await Mesa.findById(req.params.id);
    mesa.deleted = true;
    mesa.save();
    res.json('Mesa removida parcialmente.')
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
