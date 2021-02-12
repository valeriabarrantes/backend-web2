let Pais = require('../models/pais.model');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middlewares').verifyToken;

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/paises'))
  },
  filename: function (req, file, cb) {
    const fileExtension = '.' + file.originalname.split('.').pop()
    const fileName = file.fieldname + '_' + (req.body.nombre).split(' ').join('_');
    cb(null, fileName + fileExtension)
  }
})
const upload = multer({ storage: storage });
const uploadSingle = upload.single('imagen');

router.get('/', verifyToken, async (req, res) => {
  try {
    const paises = await Pais.find();
    res.json(paises);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const imagen = '/resources/uploads/paises/' + req.file.filename;
    const deleted = false;
    const nuevoPais = new Pais({
      nombre,
      imagen,
      deleted
    });
    await nuevoPais.save();
    res.json('Pais agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const pais = await Pais.findById(req.params.id);
    res.json(pais);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Pais.findByIdAndDelete(req.params.id);
    res.json('Pais removido totalmente.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const pais = await Pais.findById(req.params.id);
    pais.nombre = req.body.nombre;
    pais.imagen = '/resources/uploads/paises/' + req.file.filename;
    pais.save();
    res.json('Pais actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/delete/:id', verifyToken, async (req, res) => {
  try {
    const pais = await Pais.findById(req.params.id);
    pais.deleted = true;
    pais.save();
    res.json('Pais removido parcialmente.')
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
