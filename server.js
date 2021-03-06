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


cron.schedule('0 0 0 * * *', async() => {
    await axios.get(`https://rest-nodejs-mongodb.herokuapp.com/usuario/todos`)
        .then(res => {
            const pa = res.data;
            const m = Object.values(pa);
            var mi = m[2]

            for (let index = 0; index < mi.length; index++) {
                const element = mi[index];
                var fecha_actual = new Date();
                var fecha_a = fecha_actual.getDate() + "/" + (fecha_actual.getMonth() + 1) + "/" + fecha_actual.getFullYear()
                var fecha_p = element.siguiente
                if (fecha_a == fecha_p && fecha_p != undefined) {
                    const query = JSON.stringify({
                        "pagado": 0,
                        "siguiente": fecha_a
                    });

                    axios.put(`https://rest-nodejs-mongodb.herokuapp.com/usuario/${element._id}`, query, { headers: { "Content-Type": "application/json" } })
                        .then(res => {
                            const f = res.data;
                            var fech = Object.values(f);
                        })
                }
            }
        })

});