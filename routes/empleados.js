let Empleado = require('../models/empleado.model');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/empleados'))
  },
  filename: function (req, file, cb) {
    const fileExtension = '.' + file.originalname.split('.').pop()
    const fileName = file.fieldname + '_' + (req.body.cedula).split(' ').join('_');
    cb(null, fileName + fileExtension)
  }
})
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', upload.single('foto'), async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    res.json(empleado);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Empleado.findByIdAndDelete(req.params.id);
    res.json('Empleado removido totalmente.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', upload.single('imagen'), async (req, res) => {
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

router.post('/delete/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    empleado.deleted = true;
    empleado.save();
    res.json('Empleado removido parcialmente.')
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
