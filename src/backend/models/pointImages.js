const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Point = require('./points');

const PointImage = sequelize.define('PointImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pointId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El ID del punto es obligatorio',
      },
    },
  },
});

PointImage.belongsTo(Point, { foreignKey: 'pointId' });

module.exports = PointImage;
