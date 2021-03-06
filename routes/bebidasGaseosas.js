let BebidaGaseosa = require('../models/bebidaGaseosa.model');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middlewares').verifyToken;

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/bebidasGaseosas'))
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
    const bebidasGaseosas = await BebidaGaseosa.find();
    res.json(bebidasGaseosas);
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
    const nacionalidad = req.body.nacionalidad;
    const cantidad = Number(req.body.cantidad);
    const marca = req.body.marca;
    const foto = '/resources/uploads/bebidasGaseosas/' + req.file.filename;
    const deleted = false;
    const nuevaBebidaGaseosa = new BebidaGaseosa({
      nombre,
      precio,
      restaurante,
      descripcion,
      nacionalidad,
      cantidad,
      marca,
      foto,
      deleted
    });
    await nuevaBebidaGaseosa.save();
    res.json('Bebida Gaseosa agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const bebidaGaseosa = await BebidaGaseosa.findById(req.params.id);
    res.json(bebidaGaseosa);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await BebidaGaseosa.findByIdAndDelete(req.params.id);
    res.json('Bebida Gaseosa removida.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const bebidaGaseosa = await BebidaGaseosa.findById(req.params.id);
    bebidaGaseosa.nombre = req.body.nombre;
    bebidaGaseosa.precio = req.body.precio;
    bebidaGaseosa.restaurante = req.body.restaurante;
    bebidaGaseosa.descripcion = req.body.descripcion;
    bebidaGaseosa.nacionalidad = req.body.nacionalidad;
    bebidaGaseosa.cantidad = Number(req.body.cantidad);
    bebidaGaseosa.marca = req.body.marca;
    bebidaGaseosa.foto = req.file ? '/resources/uploads/bebidasGaseosas/' + req.file.filename : bebidaGaseosa.foto;
    bebidaGaseosa.save();
    res.json('Bebida Gaseosa actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
