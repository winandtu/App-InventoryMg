//import db from '..models/modelIndex';
const express = require('express');
const routePoints = require('./routes/routePoints');
const routeUsers = require('./routes/routeUser');
const routeImages = require('./routes/routeImages');



const app = express();
// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());
// Rutas de usuario
app.use('/users', routeUsers);
// Rutas de puntos

app.use('/points', routePoints);
// Rutas de imagenes
app.use('/images', routeImages);

// ... Otras rutas ...

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor en funcionamiento en el puerto 3000');
});