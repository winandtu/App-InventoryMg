const { DataTypes } = require('sequelize');
const  sequelize  = require('../config/database');
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
});

PointImage.belongsTo(Point, { foreignKey: 'pointId' });

module.exports = PointImage;
