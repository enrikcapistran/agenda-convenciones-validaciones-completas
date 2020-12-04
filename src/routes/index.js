const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Persona = require('../models/persona');

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexion"));
db.once("open", function(callback) {
    console.log("Conexion Exitosa.");
});



router.get('/', (req, res) => {
  const persona = Persona.find();
  console.log(persona);
  res.render('index',{
    persona
  });
});

router.post('/add', async (req, res) => {

  console.log('Recibido!! ');
  //res.send('Recibido!!!');
  //res.send(persona.nombre);

  var persona = new Persona();

  persona.nombre = req.body.nombre;
  persona.apellidoPat = req.body.apellidoPat;
  persona.apellidoMat = req.body.apellidoMat;
  persona.tel = req.body.tel;
  persona.correo = req.body.correo;

  res.send('Recibido...');

  persona.save();

});

module.exports = router;
