let Vino = require('../models/vino.model');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middlewares').verifyToken;

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/vinos'))
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
    const vinos = await Vino.find();
    res.json(vinos);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const cosecha = req.body.cosecha;
    const precioUnitario = Number(req.body.precioUnitario);
    const precioBotella = Number(req.body.precioBotella);
    const cantidad = Number(req.body.cantidad);
    const descripcion = req.body.descripcion;
    const marca = req.body.marca;
    const nacionalidad = req.body.nacionalidad;
    const restaurante = req.body.restaurante;
    const foto = '/resources/uploads/vinos/' + req.file.filename;
    const deleted = false;
    const nuevoVino = new Vino({
      nombre,
      cosecha,
      precioUnitario,
      precioBotella,
      cantidad,
      descripcion,
      marca,
      nacionalidad,
      restaurante,
      foto,
      deleted
    });
    await nuevoVino.save();
    res.json('Vino agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const vino = await Vino.findById(req.params.id);
    res.json(vino);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Vino.findByIdAndDelete(req.params.id);
    res.json('Vino removido.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const vino = await Vino.findById(req.params.id);
    vino.nombre = req.body.nombre;
    vino.cosecha = req.body.cosecha;
    vino.precioUnitario = Number(req.body.precioUnitario);
    vino.precioBotella = Number(req.body.precioBotella);
    vino.cantidad = Number(req.body.cantidad);
    vino.descripcion = req.body.descripcion;
    vino.marca = req.body.marca;
    vino.nacionalidad = req.body.nacionalidad;
    vino.restaurante = req.body.restaurante;
    vino.foto = req.file ? '/resources/uploads/vinos/' + req.file.filename : vino.foto;
    vino.save();
    res.json('Vino actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
