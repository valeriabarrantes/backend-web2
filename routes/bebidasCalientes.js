let BebidaCaliente = require('../models/bebidaCaliente');
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
    const fileExtension = '.' + file.originalname.split('.').pop();
    const nombreElemento = (req.body.nombre.replace(/[^a-zA-Z ]/g, ' ')).split(' ').join('_');
    const fileName = file.fieldname + '_' + nombreElemento;
    cb(null, fileName + fileExtension)
  }
})
const upload = multer({ storage: storage });
const uploadSingle = upload.single('foto');

router.get('/', verifyToken, async (req, res) => {
  try {
    const bebidasCalientes = await BebidaCaliente.find();
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
    const nuevaBebidaCaliente = new BebidaCaliente({
      nombre,
      precio,
      restaurante,
      descripcion,
      ingredientes,
      foto,
      deleted
    });
    await nuevaBebidaCaliente.save();
    res.json('Bebida Caliente agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const bebidaCaliente = await BebidaCaliente.findById(req.params.id);
    res.json(bebidaCaliente);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await BebidaCaliente.findByIdAndDelete(req.params.id);
    res.json('Bebida Caliente removida.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const bebidaCaliente = await BebidaCaliente.findById(req.params.id);
    bebidaCaliente.nombre = req.body.nombre;
    bebidaCaliente.precio = req.body.precio;
    bebidaCaliente.restaurante = req.body.restaurante;
    bebidaCaliente.descripcion = req.body.descripcion;
    bebidaCaliente.ingredientes = req.body.ingredientes;
    bebidaCaliente.foto = '/resources/uploads/bebidasCalientes/' + req.file.filename;
    bebidaCaliente.save();
    res.json('Bebida Caliente actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;

