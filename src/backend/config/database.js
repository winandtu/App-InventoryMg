const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('anqonavk', 'anqonavk', 'z2wbnSnNJeXVE6jjbl3dt3yAOwGUFFP-', {
  host: 'silly.db.elephantsql.com',
  dialect: 'postgres',
});

module.exports = sequelize;
