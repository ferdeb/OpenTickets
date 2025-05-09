const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Marca = require('./Marca');

const Modelo = sequelize.define('modelo', {
  modelo_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  marca_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  nombre: {
    type:DataTypes.STRING(50),
    allowNull: false
  },
  activo: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 1
  },  
}, {
  tableName: 'modelo',
  timestamps: false
});

// Relación con alias si quieres usar include
Marca.hasMany(Modelo, { foreignKey: 'marca_id' });
Modelo.belongsTo(Marca, { foreignKey: 'marca_id' });

module.exports = Modelo;