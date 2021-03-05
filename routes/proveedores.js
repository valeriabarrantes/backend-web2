let Proveedor = require('../models/proveedor.model');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middlewares').verifyToken;

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/proveedores'))
  },
  filename: function (req, file, cb) {
    const fileExtension = '.' + file.originalname.split('.').pop();
    const nombreElemento = req.body.cedula;
    const fileName = file.fieldname + '_' + nombreElemento;
    cb(null, fileName + fileExtension)
  }
})
const upload = multer({ storage: storage });
const uploadSingle = upload.single('foto');

router.get('/', verifyToken, async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const cedula = req.body.cedula;
    const fechaIngreso = req.body.fechaIngreso;
    const nombre = req.body.nombre;
    const primerApellido = req.body.primerApellido;
    const segundoApellido = req.body.segundoApellido;
    const productos = Array(req.body.productos);
    const direccion = req.body.direccion;
    const celular = req.body.celular;
    const fax = req.body.fax;
    const telefonoOficina = req.body.telefonoOficina;
    const correo = req.body.correo;
    const foto = '/resources/uploads/proveedores/' + req.file.filename;
    const deleted = false;
    const nuevoProveedor = new Proveedor({
      cedula,
      fechaIngreso,
      nombre,
      primerApellido,
      segundoApellido,
      productos,
      direccion,
      celular,
      fax,
      telefonoOficina,
      correo,
      foto,
      deleted
    });
    await nuevoProveedor.save();
    res.json('Proveedor agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    res.json(proveedor);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Proveedor.findByIdAndDelete(req.params.id);
    res.json('Proveedor removido.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    proveedor.cedula = req.body.cedula;
    proveedor.fechaIngreso = req.body.fechaIngreso;
    proveedor.nombre = req.body.nombre;
    proveedor.primerApellido = req.body.primerApellido;
    proveedor.segundoApellido = req.body.segundoApellido;
    proveedor.productos = Array(req.body.productos);
    proveedor.direccion = req.body.direccion;
    proveedor.celular = req.body.celular;
    proveedor.fax = req.body.fax;
    proveedor.telefonoOficina = req.body.telefonoOficina;
    proveedor.correo = req.body.correo;
    proveedor.foto = '/resources/uploads/proveedores/' + req.file.filename;
    proveedor.save();
    res.json('Proveedor actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
