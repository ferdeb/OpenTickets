const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ruta de la conexión
const Ticket = require('./Ticket');

const Reparacion = sequelize.define('reparacion', {
  reparacion_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  ticket_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
},
 {
  tableName: 'reparacion',   // coincide con tu tabla en la base de datos :contentReference[oaicite:4]{index=4}
  timestamps: false       // desactiva createdAt y updatedAt :contentReference[oaicite:5]{index=5}
});

// Relación con alias si quieres usar include
Ticket.hasMany(Reparacion, { foreignKey: 'ticket_id' });
Reparacion.hasMany(Ticket, { foreignKey: 'ticket_id' });

module.exports = Reparacion;