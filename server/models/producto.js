const mogoose = require('mongoose');

let Schema = mogoose.Schema;

let tiposValidos = {
    values: ['deportivo', 'bazar', 'alimentos'],
    message: '{VALUE} no es un caja válida'
}

let productoSchema = new Schema({
    producto: {
        type: String,
        required: [true, 'El nombre del producto es requerido'],

    },
    tipo: {
        type: String,
        required: [true, 'El tipo es necesario'],
        enum: tiposValidos
    },
    cantidad: {
        type: String,
        required: [true, 'La cantidad es necesario'],
    },
    precio: {
        type: String,
        required: [true, 'El precio es necesario'],
    }
});

productoSchema.methods.toJSON = function() {
    let pro = this;
    let prodObjet = pro.toObject();

    return prodObjet;
}

module.exports = mogoose.model('Producto', productoSchema);