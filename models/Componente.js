const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ruta de la conexión
const Modelo = require('./Modelo');

const Componente = sequelize.define('componente', {
  componente_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  modelo_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  activo: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 1
  },   
},
 {
  tableName: 'componente',   // coincide con tu tabla en la base de datos :contentReference[oaicite:4]{index=4}
  timestamps: false       // desactiva createdAt y updatedAt :contentReference[oaicite:5]{index=5}
});

// Relación con alias si quieres usar include
Modelo.hasMany(Componente, { foreignKey: 'modelo_id' });
Componente.hasMany(Modelo, { foreignKey: 'modelo_id' });

module.exports = Componente;