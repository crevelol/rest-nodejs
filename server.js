require("./server/config/config");

const axios = require('axios');

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { request } = require("http");
const path = require('path')
var cors = require('cors');

var cron = require('node-cron');

const app = express();

app.use(cors({ origin: '*' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require("./server/routes/index"));

mongoose.connect(
    process.env.URLDB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },

    (err, res) => {
        if (err) throw err;

        console.log("Base de datos ONLINE!");
    }
);

app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto: ", process.env.PORT);
});

cron.schedule('*/10 * * * * *', () => {
    axios.get(`https://rest-nodejs-mongodb.herokuapp.com/usuario/todos`)
        .then(res => {
            const pa = res.data;
            var m = Object.values(pa);
            console.log(m);
            //this.setState({ usuarios: this.state.usuarios[0] })
        })
});