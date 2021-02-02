const express = require("express");
const Producto = require("../models/producto");
const _ = require('underscore');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticación')

const app = express();

app.get("/producto/cant", verificaToken, function(req, res) {

    let cant1 = req.query.desde;
    let cant2 = req.query.hasta;

    Producto.find({ cantidad: { $gte: cant1 }, cantidad: { $lte: cant2 } }, 'producto tipo cantidad precio')
        .exec((err, registro) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Producto.count({ cantidad: { $gte: cant1 }, cantidad: { $lte: cant2 } }, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    registro
                });
            });
        });
});

app.get("/producto", verificaToken, function(req, res) {

    Producto.find({}, 'producto tipo cantidad precio')
        .exec((err, registro) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Producto.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    registro
                });
            });
        });
});

app.get("/producto/tipo/:tip", verificaToken, function(req, res) {

    let tip = req.params.tip;

    Producto.find({ tipo: tip }, 'producto tipo cantidad precio')
        .exec((err, registro) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Producto.count({ tipo: tip }, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    registro
                });
            });
        });
});

app.post("/registro", [verificaToken, verificaAdminRole], function(req, res) {
    let body = req.body;

    let producto = new Producto({
        producto: body.producto,
        tipo: body.tipo,
        cantidad: body.cantidad,
        precio: body.precio
    });

    producto.save((err, cajaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            caja: cajaDB
        });
    });

});

app.put("/producto/:id", [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;
    let update = req.body

    Usuario.findByIdAndUpdate(id, update, (err, usuarioDB) => {

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

/*
app.delete("/registro/:id", [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;

    Producto.findByIdAndDelete(id, (err, registroEliminado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            registro: registroEliminado
        });

    });

});
*/
module.exports = app;