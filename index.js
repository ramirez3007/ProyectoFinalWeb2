require('dotenv').config()
//Crear el servidor
const express = require('express')
const routerBooks = require('./routes');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express()

const PORT= process.env.PORT || 3001

app.use(express.json());

// Middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method')); // Agregar method-override

//Rutas
routerBooks(app);

app.set('views', './src/views');
app.set('view engine', '.ejs');

//Levantando el servidor para escuchar el puerto 3001
app.listen(PORT, () => {
    console.log('Listening on port:'+PORT);
})