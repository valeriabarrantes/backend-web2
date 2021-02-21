let BebidaCliente = require('../models/bebidaCliente');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middlewares').verifyToken;

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/bebidasCalientes'))
  },
  filename: function (req, file, cb) {
    const fileExtension = '.' + file.originalname.split('.').pop()
    const fileName = file.fieldname + '_' + (req.body.nombre).split(' ').join('_');
    cb(null, fileName + fileExtension)
  }
})
const upload = multer({ storage: storage });
const uploadSingle = upload.single('foto');

router.get('/', verifyToken, async (req, res) => {
  try {
    const bebidasCalientes = await BebidaCliente.find();
    res.json(bebidasCalientes);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const restaurante = req.body.restaurante;
    const descripcion = req.body.descripcion;
    const ingredientes = req.body.ingredientes;
    const foto = '/resources/uploads/bebidasCalientes/' + req.file.filename;
    const deleted = false;
    const nuevaBebidaCliente= new BebidaCliente({
      nombre,
      precio,
      restaurante,
      descripcion,
      ingredientes,
      foto,
      deleted
    });
    await nuevaBebidaCliente.save();
    res.json('Bebida Cliente agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const bebidaCliente = await BebidaCliente.findById(req.params.id);
    res.json(bebidaCliente);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await BebidaCliente.findByIdAndDelete(req.params.id);
    res.json('Bebida Cliente removida.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const bebidaCliente = await BebidaCliente.findById(req.params.id);
    bebidaCliente.nombre = req.body.nombre;
    bebidaCliente.precio = req.body.precio;
    bebidaCliente.restaurante = req.body.restaurante;
    bebidaCliente.descripcion = req.body.descripcion;
    bebidaCliente.ingredientes = req.body.ingredientes;
    bebidaCliente.foto = '/resources/uploads/bebidasCalientes/' + req.file.filename;
    bebidaCliente.save();
    res.json('Bebida Cliente actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;

