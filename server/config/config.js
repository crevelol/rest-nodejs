// ===========================================
//  Puerto
// ===========================================
process.env.PORT = process.env.PORT || 3000;

// ===========================================
//  Entorno
// ===========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================================
//  Base de datos
// ===========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    ulrDB = "mongodb+srv://cocoa-user:cocoa-user@cluster0.0jiih.mongodb.net/tae_baek";
} else {
    ulrDB = "mongodb+srv://cocoa-user:cocoa-user@cluster0.0jiih.mongodb.net/tae_baek";
}

process.env.URLDB = ulrDB;

// ===========================================
//  Vencimiento del Token
// ===========================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ===========================================
//  SEED de autenticación
// ===========================================
process.env.SEED = process.env.SEED || 'este-es-la-clave-en-dev';