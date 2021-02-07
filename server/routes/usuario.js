const express = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcrypt');
const _ = require('underscore');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticación')

const app = express();

app.get("/usuario/pagos/:id", verificaToken, function(req, res) {

    let id = req.params.id;

    Usuario.find({ _id: id }, 'estado registro inscripcion monto pagado peso altura')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Usuario.count({ _id: id }, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    usuarios
                });
            });
        });
});

app.get("/usuario", [verificaToken, verificaAdminRole], function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ role: 'USER ROLE' }, 'nombre apellido email telefono direccion nacimiento sexo role estado')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Usuario.count({ role: 'USER ROLE' }, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    usuarios
                });
            });
        });
});

app.post("/usuario", function(req, res) {
    let body = req.body;

    let n = new Date();
    //Año
    let y = n.getFullYear();
    //Mes
    let m = n.getMonth() + 1;
    //Día
    let d = n.getDate();

    var fech = y + "-" + m + "-" + d

    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        telefono: body.telefono,
        direccion: body.direccion,
        nacimiento: body.nacimiento,
        registro: fech,
        sexo: body.sexo
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put("/usuario/:id", [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.delete("/usuario/:id", [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;

    let cambiarEstado = {
        estado: false
    }

    // Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado en la BDD'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

module.exports = app;