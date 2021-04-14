const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Especialidades = require('../models/especialidades.model');
let Buffet = require('../models/buffet.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const buffet = await Buffet.find();
    const especialidades = await Especialidades.find();
    res.json([...buffet, ...especialidades]);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
