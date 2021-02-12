const router = require('express').Router();
const verifyToken = require('../middlewares').verifyToken;
let Usuario = require('../models/usuario.model');

router.post('/login', async (req, res) => {
  try {
    const login = req.body.login;
    const contrasena = req.body.contrasena;
    const usuarios = await Usuario.find();
    const usuario = usuarios.find(usuario => usuario.login == login && usuario.contrasena == contrasena);
    jwt.sign({user: usuario}, process.env.SECRET, (err, token) => {
      res.json({token});
    })
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const primerApellido = req.body.primerApellido;
    const segundoApellido = req.body.segundoApellido;
    const telefonoFijo = req.body.telefonoFijo;
    const telefonoCelular = req.body.telefonoCelular;
    const login = req.body.login;
    const administradorSistema = Boolean(req.body.administradorSistema);
    const administradorSeguridad = Boolean(req.body.administradorSeguridad);
    const administradorRestaurante = Boolean(req.body.administradorRestaurante);
    const administradorCuentas = Boolean(req.body.administradorCuentas);
    const contrasena = req.body.contrasena;
    const deleted = false;
    const nuevoUsuario= new Usuario({
      nombre,
      primerApellido,
      segundoApellido,
      telefonoFijo,
      telefonoCelular,
      login,
      administradorSistema,
      administradorSeguridad,
      administradorRestaurante,
      administradorCuentas,
      contrasena,
      deleted
    });
    await nuevoUsuario.save();
    res.json('Usuario agregado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-contrasena");
    res.json(usuario);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json('Usuario removido totalmente.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/update/:id', verifyToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    usuario.nombre = req.body.nombre;
    usuario.primerApellido = req.body.primerApellido;
    usuario.segundoApellido = req.body.segundoApellido;
    usuario.telefonoFijo = req.body.telefonoFijo;
    usuario.telefonoCelular = req.body.telefonoCelular;
    usuario.login = req.body.login;
    usuario.administradorSistema = Boolean(req.body.administradorSistema);
    usuario.administradorSeguridad = Boolean(req.body.administradorSeguridad);
    usuario.administradorRestaurante = Boolean(req.body.administradorRestaurante);
    usuario.administradorCuentas = Boolean(req.body.administradorCuentas);
    usuario.contrasena = req.body.contrasena;
    usuario.save();
    res.json('Usuario actualizado!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/delete/:id', verifyToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    usuario.deleted = true;
    usuario.save();
    res.json('Usuario removido parcialmente.')
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
