let Buffet= require('../models/buffet.model');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middlewares').verifyToken;

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/buffet'))
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
    const buffet = await Buffet.find();
    res.json(buffet);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const precio = Number(req.body.precio);
    const tipo = req.body.tipo;
    const unidadDeMedida = req.body.unidadDeMedida;
    const foto = '/resources/uploads/buffet/' + req.file.filename;
    const deleted = false;
    const nuevoBuffet = new Buffet({
      nombre,
      precio,
      tipo,
      unidadDeMedida,
      foto,
      deleted
    });
    await nuevoBuffet.save();
    res.json('Buffet agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const buffet = await Buffet.findById(req.params.id);
    res.json(buffet);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Buffet.findByIdAndDelete(req.params.id);
    res.json('Buffet removido.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const buffet = await Buffet.findById(req.params.id);
    buffet.nombre = req.body.nombre;
    buffet.precio = Number(req.body.precio);
    buffet.tipo = req.body.tipo;
    buffet.unidadDeMedida = req.body.unidadDeMedida;
    buffet.foto = req.file ? '/resources/uploads/buffet/' + req.file.filename : buffet.foto;
    buffet.save();
    res.json('buffet actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;

