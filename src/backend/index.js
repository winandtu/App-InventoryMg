//import db from '..models/modelIndex';
const express = require('express');
const sequelize = require('./config/database'); // Importa sequelize
const User = require('./models/user');
const Point = require('./models/points');
const pointImage = require('./models/pointImages');


const app = express();

// Configura y utiliza middlewares, rutas, etc.

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado');
});