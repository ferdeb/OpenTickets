const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Articulo = require('./Articulo');
const Tecnico = require('./Tecnico');
const Estado_Ticket = require('./Estado_Ticket');
const Prioridad = require('./Prioridad');

const Ticket = sequelize.define('ticket', {
  ticket_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  articulo_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  tecnico_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado_ticket_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  prioridad_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  diagnostico: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  tableName: 'ticket',
  timestamps: false
});

// Relación con alias si quieres usar include

Articulo.hasMany(Ticket, { foreignKey: 'articulo_id' });
Ticket.belongsTo(Articulo, { foreignKey: 'articulo_id' });

Prioridad.hasMany(Ticket, { foreignKey: 'prioridad_id' });
Ticket.belongsTo(Prioridad, { foreignKey: 'prioridad_id' });

Tecnico.hasMany(Ticket, { foreignKey: 'tecnico_id' });
Ticket.belongsTo(Tecnico, { foreignKey: 'tecnico_id' });

Estado_Ticket.hasMany(Ticket, { foreignKey: 'estado_ticket_id' });
Ticket.belongsTo(Estado_Ticket, { foreignKey: 'estado_ticket_id' });

module.exports = Ticket;