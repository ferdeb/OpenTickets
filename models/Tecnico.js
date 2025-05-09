const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ruta de la conexión

const Tecnico = sequelize.define('tecnico', {
  tecnico_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  activo: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 1
  },  
},
 {
  tableName: 'tecnico',   // coincide con tu tabla en la base de datos :contentReference[oaicite:4]{index=4}
  timestamps: false       // desactiva createdAt y updatedAt :contentReference[oaicite:5]{index=5}
});

module.exports = Tecnico;