const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Persona = mongoose.model('Persona');

router.get('/', (req, res) => {
    res.render("./personas/agregar", {
        viewTitle: "Insert Persona"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var persona = new Persona();
    Persona.aggregate=([{
      $match: {

      $or: [{
          "ciudad": {
              $regex: '[tms]+',
              $options: 'i'
          }
      }, {
          "ciudad": {
              $regex: '[tms]+',
              $options: 'i'
          }
      }]

  }
    }])
    persona.nombre = req.body.nombre;
    persona.apellidoPat = req.body.apellidoPat;
    persona.apellidoMat = req.body.apellidoMat;
    persona.email = req.body.email;
    persona.tel = req.body.tel;
    persona.ciudad = req.body.ciudad;
    persona.save((err, doc) => {
        if (!err)
            res.redirect('personas/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("personas/agregar", {
                    viewTitle: "Insert Persona",
                    persona: req.body
                });
            }
            else
                console.log('Error al guardar a la BD : ' + err);
        }
    });
}

function updateRecord(req,  res) {
    Persona.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('personas/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("personas/agregar", {
                    viewTitle: 'Update Persona',
                    persona: req.body
                });
            }
            else
                console.log('Error en actualizacion : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Persona.find((err, docs) => {
        if (!err) {
            res.render("personas/list", {
                list: docs
            });
        }
        else {
            console.log('Error consiguiendo informacion de persona list :' + err);
        }
    }).sort({nombre: 1});
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Persona.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("personas/editar", {
                viewTitle: "Update Persona",
                persona: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Persona.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/personas/list');
        }
        else { console.log('Error con persona delete :' + err); }
    });
});

module.exports = router;
