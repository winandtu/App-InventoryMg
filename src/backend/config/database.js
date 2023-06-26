const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('inventory', 'postgres', 'danilo', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
