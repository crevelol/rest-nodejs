const mogoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mogoose.Schema;

let sexosValidos = {
    values: ['masculino', 'femenino'],
    message: '{VALUE} no es un sexo valido'
}

let rolesValidos = {
    values: ['USER ROLE', 'ADMIN ROLE'],
    message: '{VALUE} no es un sexo valido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    apellido: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El e-mail es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    telefono: {
        type: String,
        required: false
    },
    direccion: {
        type: String,
        default: 'SIN DIRECCION',
    },
    nacimiento: {
        type: Date,
        required: [true, 'El nacimiento es obligatorio']
    },
    sexo: {
        type: String,
        enum: sexosValidos,
        required: [true, 'El sexo es obligatorio']
    },
    role: {
        type: String,
        default: 'USER ROLE'
    },
    img: {
        type: String,
        required: false
    },
    estado: {
        type: String,
        default: true,
    },
    registro: {
        type: String,
        required: [true, 'El nacimiento es obligatorio']
    }
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;

    return userObjet;
}

module.exports = mogoose.model('Usuario', usuarioSchema);