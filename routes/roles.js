const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Rol = require('../models/rol.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const roles = await Rol.find();
    res.json(roles);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const deleted = false;
    const nuevoRol= new Rol({
      nombre,
      descripcion,
      deleted
    });
    await nuevoRol.save();
    res.json('Rol agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    res.json(rol);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Rol.findByIdAndDelete(req.params.id);
    res.json('Rol removido totalmente.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    rol.nombre = req.body.nombre;
    rol.descripcion = req.body.descripcion;
    rol.save();
    res.json('Rol actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/delete/:id', verifyToken, async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    rol.deleted = true;
    rol.save();
    res.json('Rol removido parcialmente.')
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
