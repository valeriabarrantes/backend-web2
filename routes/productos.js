const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Comestible = require('../models/comestible.model');
let Tecnologia = require('../models/tecnologia.model');
let Desechable = require('../models/desechable.model');
let Utensilio = require('../models/utensilio.model');
let Limpieza = require('../models/limpieza.model');

router.get('/', verifyToken, async (req, res) => {
  try {
    const comestibles = await Comestible.find();
    const tecnologia = await Tecnologia.find();
    const desechables = await Desechable.find();
    const utensilios = await Utensilio.find();
    const limpieza = await Limpieza.find();
    res.json([...comestibles, ...tecnologia, ...desechables, ...utensilios, ...limpieza]);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
