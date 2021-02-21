let BebidaHelada= require('../models/bebidaHelada');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middlewares').verifyToken;

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/bebidasHeladas'))
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
    const bebidasHeladas = await BebidaHelada.find();
    res.json(bebidasHeladas);
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
    const foto = '/resources/uploads/bebidasHeladas/' + req.file.filename;
    const deleted = false;
    const nuevaBebidaHelada = new BebidaHelada({
      nombre,
      precio,
      restaurante,
      descripcion,
      ingredientes,
      foto,
      deleted
    });
    await nuevaBebidaHelada.save();
    res.json('Bebida Helada agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const bebidaHelada = await BebidaHelada.findById(req.params.id);
    res.json(bebidaHelada);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await BebidaHelada.findByIdAndDelete(req.params.id);
    res.json('Bebida Helada removida.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const bebidaHelada = await BebidaHelada.findById(req.params.id);
    bebidaHelada.nombre = req.body.nombre;
    bebidaHelada.precio = req.body.precio;
    bebidaHelada.restaurante = req.body.restaurante;
    bebidaHelada.descripcion = req.body.descripcion;
    bebidaHelada.ingredientes = req.body.ingredientes;
    bebidaHelada.foto = '/resources/uploads/bebidasHeladas/' + req.file.filename;
    bebidaHelada.save();
    res.json('Bebida Helada actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;

