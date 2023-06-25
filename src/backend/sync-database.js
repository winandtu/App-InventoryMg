const sequelize = require('./config/config.json');
const models = require('./models/modelsIndex');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // Esto creará las tablas, pero ten en cuenta que eliminará los datos existentes en la base de datos
    console.log('Tablas creadas correctamente.');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
  } finally {
    sequelize.close(); // Cierra la conexión con la base de datos al finalizar
  }
}

syncDatabase();
