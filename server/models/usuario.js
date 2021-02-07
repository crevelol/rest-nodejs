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

let inscripcionValidos = {
    values: ['sin pagar', 'pagado', 'promocion'],
    message: '{VALUE} no es una incripcion valido'
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
        type: String,
        required: [true, 'El nacimiento es obligatorio']
    },
    sexo: {
        type: String,
        enum: sexosValidos,
        required: [true, 'El sexo es obligatorio']
    },
    role: {
        type: String,
        default: 'USER ROLE',
        enum: rolesValidos
    },
    img: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true,
    },
    registro: {
        type: String,
        required: false
    },
    inscripcion: {
        type: String,
        required: false,
        enum: inscripcionValidos
    },
    monto: {
        type: String,
        required: false
    },
    pagado: {
        type: String,
        required: false
    },
    peso: {
        type: String,
        required: false
    },
    altura: {
        type: String,
        required: false
    },
    siguiente: {
        type: String,
        required: false
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