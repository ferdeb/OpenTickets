const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cliente = require('./Cliente');
const Modelo = require('./Modelo');
const Estado_Articulo = require('./Estado_Articulo');

const Articulo = sequelize.define('articulo', {
  articulo_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  cliente_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  modelo_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  serie: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado_articulo_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
}, {
  tableName: 'articulo',
  timestamps: false
});

// Relación con alias si quieres usar include
Cliente.hasMany(Articulo, { foreignKey: 'cliente_id' });
Articulo.belongsTo(Cliente, { foreignKey: 'cliente_id' });

Modelo.hasMany(Articulo, { foreignKey: 'modelo_id' });
Articulo.belongsTo(Modelo , { foreignKey: 'modelo_id' });

Estado_Articulo.hasMany(Articulo, { foreignKey: 'estado_articulo_id' });
Articulo.belongsTo(Estado_Articulo, { foreignKey: 'estado_articulo_id' });

module.exports = Articulo;