//import db from '..models/modelIndex';
const sequelize = require('../config/database'); // Importa sequelize
const User = require('../models/user');
const Point = require('../models/points');
const pointImage = require('../models/pointImages');
// Importa los demás modelos aquí...

// Realiza las migraciones
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Migraciones completadas');
    // Aquí puedes continuar con el código de tu aplicación
  })
  .catch((error) => {
    console.error('Error al realizar las migraciones:', error);
  });
