const mongoose = require('mongoose');

var personaSchema = new mongoose.Schema({
    nombre: {
        type: String,
    },
    apellidoPat: {
        type: String,
    },
    apellidoMat: {
        type: String,
    },
    email: {
        type: String,
    },
    tel: {
        type: Number,
    },
    ciudad: {
        type: String
    }
});

// Validacion de EMAIL
personaSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'E-mail Invalido.');

mongoose.model('Persona', personaSchema);
