const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ruta de la conexión

const Estado_Ticket = sequelize.define('estado_ticket', {
  estado_ticket_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  activo: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 1
  },  
},
 {
  tableName: 'estado_ticket',   // coincide con tu tabla en la base de datos :contentReference[oaicite:4]{index=4}
  timestamps: false       // desactiva createdAt y updatedAt :contentReference[oaicite:5]{index=5}
});

module.exports = Estado_Ticket;