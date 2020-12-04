const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var mongodb = require('mongodb');

var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');

const app = express();
var bodyParser = require('body-parser');
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/agenda");


//Conectando a BD

//Importando rutas
const indexRoutes = require('./routes/index');

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json());

//Rutas
app.use('/', indexRoutes);


//Iniciando servidor
app.listen(app.get('port'), () => {
  console.log('Server on port 3000');
});
