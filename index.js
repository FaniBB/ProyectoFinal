// zvykjhgbclrfdkvc

const express = require("express"); //importar express
const bodyParser = require("body-parser");
const cors = require('cors');
const configMensaje = require('./configMensaje');

const app = express(); //crear al servidor
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log(`hola servidor ejecucion en http://localhost:${port}`);
})

app.post('/formulario', (req, res) =>{
    configMensaje/req.body;
    res.status(200).send();
})
