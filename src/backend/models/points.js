const { DataTypes, Model } = require('sequelize');
const  sequelize  = require('../config/database');


const User = require('./user');

const Point = sequelize.define('Point', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  create_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { 
        msg: 'El ID de usuario es obligatorio'
      },
    },
  },
});

Point.belongsTo(User, { foreignKey: 'userId' });

module.exports = Point;
