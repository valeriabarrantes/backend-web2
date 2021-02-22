let Empleado = require('../models/empleado.model');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middlewares').verifyToken;

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/empleados'))
  },
  filename: function (req, file, cb) {
    const fileExtension = '.' + file.originalname.split('.').pop();
    const nombreElemento = (req.body.cedula.replace(/[^a-zA-Z ]/g, ' ')).split(' ').join('_');
    const fileName = file.fieldname + '_' + nombreElemento;
    cb(null, fileName + fileExtension)
  }
})
const upload = multer({ storage: storage });
const uploadSingle = upload.single('foto');

router.get('/', verifyToken, async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const primerApellido = req.body.primerApellido;
    const segundoAppelido = req.body.segundoAppelido;
    const telefono1 = req.body.telefono1;
    const telefono2 = req.body.telefono2;
    const puesto = req.body.puesto;
    const restaurante = req.body.restaurante;
    const nacionalidad = req.body.nacionalidad;
    const foto = '/resources/uploads/empleados/' + req.file.filename;
    const deleted = false;
    const nuevoEmpleado = new Empleado({
      cedula,
      nombre,
      primerApellido,
      segundoAppelido,
      telefono1,
      telefono2,
      puesto,
      restaurante,
      nacionalidad,
      foto,
      deleted
    });
    await nuevoEmpleado.save();
    res.json('Empleado agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    res.json(empleado);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Empleado.findByIdAndDelete(req.params.id);
    res.json('Empleado removido.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    empleado.cedula = req.body.cedula;
    empleado.nombre = req.body.nombre;
    empleado.primerApellido = req.body.primerApellido;
    empleado.segundoAppelido = req.body.segundoAppelido;
    empleado.telefono1 = req.body.telefono1;
    empleado.telefono2 = req.body.telefono2;
    empleado.puesto = req.body.puesto;
    empleado.restaurante = req.body.restaurante;
    empleado.nacionalidad = req.body.nacionalidad;
    empleado.foto = '/resources/uploads/empleados/' + req.file.filename;
    empleado.save();
    res.json('Empleado actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
