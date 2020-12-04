const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Persona = new mongoose.Schema({
  nombre: String,
  apellidoPat: String,
  apellidoMat: String,
  tel: String,
  correo: String
 },
 {
  collection: 'persona'
 });



module.exports = mongoose.model('persona', Persona);
