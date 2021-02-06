let Marca = require('../models/marca.model');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/marcas'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + (req.body.nombreMarca).split(' ').join('_') + '.png')
  }
})
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const marcas = await Marca.find();
    res.json(marcas);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', upload.fields([{name: 'fotoMarca', maxCount: 1}, {name: 'fotoEmpresa', maxCount: 1}]), async (req, res) => {
  try {
    const nombreMarca = req.body.nombreMarca;
    const descripcionMarca = req.body.descripcionMarca;
    const nacionalidad = req.body.nacionalidad;
    const fotoMarca = req.files.fotoMarca[0].filename;
    const cedulaEmpresa = req.body.cedulaEmpresa;
    const nombreEmpresa = req.body.nombreEmpresa;
    const detalleEmpresa = req.body.detalleEmpresa;
    const telefonoEmpresa = req.body.telefonoEmpresa;
    const fotoEmpresa = req.files.fotoEmpresa[0].filename;
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
    res.json('Marca agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const marca = await Marca.findById(req.params.id);
    res.json(marca);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Marca.findByIdAndDelete(req.params.id);
    res.json('Marca removida totalmente.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const marcas = await Marca.findById(req.params.id);
    marcas.nombreMarca = req.body.nombreMarca;
    marcas.descripcionMarca = req.body.descripcionMarca;
    marcas.nacionalidad = req.body.nacionalidad;
    marcas.fotoMarca = req.body.fotoMarca;
    marcas.cedulaEmpresa = req.body.cedulaEmpresa;
    marcas.nombreEmpresa = req.body.nombreEmpresa;
    marcas.detalleEmpresa = req.body.detalleEmpresa;
    marcas.telefonoEmpresa = req.body.telefonoEmpresa;
    marcas.fotoEmpresa = req.body.fotoEmpresa;
    marcas.save();
    res.json('Marcas actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const marca = await Marca.findById(req.params.id);
    marca.deleted = true;
    marca.save();
    res.json('Marca removida parcialmente.')
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
