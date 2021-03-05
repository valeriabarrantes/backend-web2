let Marca = require('../models/marca.model');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middlewares').verifyToken;

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/marcas'))
  },
  filename: function (req, file, cb) {
    const fileExtension = '.' + file.originalname.split('.').pop();
    const nombreElemento = (req.body.nombreMarca.replace(/[^a-zA-Z ]/g, ' ')).split(' ').join('_');
    const fileName = file.fieldname + '_' + nombreElemento;
    cb(null, fileName + fileExtension)
  }
})
const upload = multer({ storage: storage });
const uploadDouble = upload.fields([{name: 'fotoMarca', maxCount: 1}, {name: 'fotoEmpresa', maxCount: 1}]);

router.get('/', verifyToken, async (req, res) => {
  try {
    const marcas = await Marca.find();
    res.json(marcas);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', [verifyToken, uploadDouble], async (req, res) => {
  try {
    const nombreMarca = req.body.nombreMarca.replace(/[^a-zA-Z ]/g, ' ');
    const descripcionMarca = req.body.descripcionMarca;
    const nacionalidad = req.body.nacionalidad;
    const fotoMarca = '/resources/uploads/marcas/' + req.files.fotoMarca[0].filename;
    const cedulaEmpresa = req.body.cedulaEmpresa;
    const nombreEmpresa = req.body.nombreEmpresa;
    const detalleEmpresa = req.body.detalleEmpresa;
    const telefonoEmpresa = req.body.telefonoEmpresa;
    const fotoEmpresa = '/resources/uploads/marcas/' + req.files.fotoEmpresa[0].filename;
    const deleted = false;
    const nuevaMarca = new Marca({
      nombreMarca,
      descripcionMarca,
      nacionalidad,
      fotoMarca,
      cedulaEmpresa,
      nombreEmpresa,
      detalleEmpresa,
      telefonoEmpresa,
      fotoEmpresa,
      deleted
    });
    await nuevaMarca.save();
    res.json('Marca agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const marca = await Marca.findById(req.params.id);
    res.json(marca);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Marca.findByIdAndDelete(req.params.id);
    res.json('Marca removida.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken ,uploadDouble], async (req, res) => {
  try {
    const marcas = await Marca.findById(req.params.id);
    marcas.nombreMarca = req.body.nombreMarca;
    marcas.descripcionMarca = req.body.descripcionMarca;
    marcas.nacionalidad = req.body.nacionalidad;
    marcas.fotoMarca = req.files.fotoMarca[0] ? '/resources/uploads/marcas/' + req.files.fotoMarca[0].filename : marcas.fotoMarca;
    marcas.cedulaEmpresa = req.body.cedulaEmpresa;
    marcas.nombreEmpresa = req.body.nombreEmpresa;
    marcas.detalleEmpresa = req.body.detalleEmpresa;
    marcas.telefonoEmpresa = req.body.telefonoEmpresa;
    marcas.fotoEmpresa = req.files.fotoEmpresa[0] ? '/resources/uploads/marcas/' + req.files.fotoEmpresa[0].filename : marcas.fotoEmpresa;
    marcas.save();
    res.json('Marca actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
