const router = require('express').Router();
let Mesa = require('../models/mesa.model');

router.route('/').get((req, res) => {
    Mesa.find()
        .then(mesas => res.json(mesas))
        .catch(err => res.status(400).jason('Error:' + err));
});

router.route('/add').post((req, res) => {
    const codigo = req.body.codigo;
    const nombre = req.body.nombre;
    const numero = Number(req.body.numero);
    const sillas = Number(req.body.sillas);
    const deleted = false;

    const nuevaMesa = new Mesa({
        codigo,
        nombre,
        numero,
        sillas,
        deleted,
    });

    nuevaMesa.save()
        .then(() => res.json('Mesa agregada!'))
        .catch(err => res.status(400).json('Error' + err));
})

module.exports = router;