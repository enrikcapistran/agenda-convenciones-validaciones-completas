const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/AgendaDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('Conexión Exitosa.') }
    else { console.log('Error al conectar a la BDD : ' + err) }

});
require('./persona.model');
