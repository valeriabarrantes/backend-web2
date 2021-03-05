let Especialidad = require('../models/especialidades.model');
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middlewares').verifyToken;

// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads/especialidades'))
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
    const especialidades = await Especialidad.find();
    res.json(especialidades);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const ingredientes = req.body.ingredientes;
    const precio = Number(req.body.precio);
    const detalle = req.body.detalle;
    const foto = '/resources/uploads/especialidades/' + req.file.filename;
    const deleted = false;
    const nuevaEspecialidad = new Especialidad({
      nombre,
      ingredientes,
      precio,
      detalle,
      foto,
      deleted
    });
    await nuevaEspecialidad.save();
    res.json('Especialidad agregada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const especialidad = await Especialidad.findById(req.params.id);
    res.json(especialidad);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Especialidad.findByIdAndDelete(req.params.id);
    res.json('Especialidad removida.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', [verifyToken, uploadSingle], async (req, res) => {
  try {
    const especialidades = await Especialidad.findById(req.params.id);
    especialidades.nombre = req.body.nombre;
    especialidades.ingredientes = req.body.ingredientes;
    especialidades.precio = Number(req.body.precio);
    especialidades.detalle = req.body.detalle;
    especialidades.foto = req.file ? '/resources/uploads/especialidades/' + req.file.filename : especialidades.foto;
    especialidades.save();
    res.json('Especialidad actualizada!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
