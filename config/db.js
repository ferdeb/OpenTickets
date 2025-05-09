// Conector hacia la base de datos MariaDB

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sistematickets', 'root', 'debian', {
  host: '127.0.0.1',
  dialect: 'mariadb',
  logging: console.log // Activar solo para ver peticiones en consola
});

module.exports = sequelize;