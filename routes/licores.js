let Licor = require('../models/licor.model');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middlewares').verifyToken;

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/licores'))
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
    const licores = await Licor.find();
    res.json(licores);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const precioUnitario = Number(req.body.precioUnitario);
    const precioBotella = Number(req.body.precioBotella);
    const cantidad = Number(req.body.cantidad);
    const descripción = req.body.descripción;
    const marca = req.body.marca;
    const nacionalidad = req.body.nacionalidad;
    const restaurante = req.body.restaurante;
    const foto = '/resources/uploads/licores/' + req.file.filename;
    const deleted = false;
    const nuevoLicor = new Licor({
      nombre,
      precioUnitario,
      precioBotella,
      cantidad,
      descripción,
      marca,
      nacionalidad,
      restaurante,
      foto,
      deleted
    });
    await nuevoLicor.save();
    res.json('Licor agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const licor = await Licor.findById(req.params.id);
    res.json(licor);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Licor.findByIdAndDelete(req.params.id);
    res.json('Licor removido.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const licor = await Licor.findById(req.params.id);
    licor.nombre = req.body.nombre;
    licor.precioUnitario = Number(req.body.precioUnitario);
    licor.precioBotella = Number(req.body.precioBotella);
    licor.cantidad = Number(req.body.cantidad);
    licor.descripción = req.body.descripción;
    licor.marca = req.body.marca;
    licor.nacionalidad = req.body.nacionalidad;
    licor.restaurante = req.body.restaurante;
    licor.foto = req.file ? '/resources/uploads/licores/' + req.file.filename : licor.foto;
    licor.save();
    res.json('Licor actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
