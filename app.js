const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./config/db');

// Rutas
const articuloRoutes = require('./routes/articuloRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const componenteRoutes = require('./routes/componenteRoutes');
const estado_articuloRoutes = require('./routes/estado_articuloRoutes');
const estado_ticketRoutes = require('./routes/estado_ticketRoutes');
const marcaRoutes = require('./routes/marcaRoutes');
const modeloRoutes = require('./routes/modeloRoutes');
const prioridadRoutes = require('./routes/prioridadRoutes');
const reparacionRoutes = require('./routes/reparacionRoutes');
const tecnicoRoutes = require('./routes/tecnicoRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Archivos estáticos (si usas CSS o JS extra)
app.use(express.static(path.join(__dirname, 'public')));

// Usar rutas
app.use('/', require('./routes/indexRoutes'));
app.use('/articulos', articuloRoutes);
app.use('/clientes', clienteRoutes);
app.use('/componentes', componenteRoutes);
app.use('/estado_articulos', estado_articuloRoutes);
app.use('/estado_tickets', estado_ticketRoutes);
app.use('/marcas', marcaRoutes);
app.use('/modelos', modeloRoutes);
app.use('/prioridades', prioridadRoutes);
app.use('/reparaciones', reparacionRoutes);
app.use('/tecnicos', tecnicoRoutes);
app.use('/tickets', ticketRoutes);

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.redirect('/index'); // Redirige a /index por defecto
});

// Conexión a la base de datos y arranque del servidor
sequelize.sync({ force: false }) // Cambia a true solo para desarrollo
  .then(() => {
    console.log('✅ Base de datos conectada y sincronizada');
    app.listen(3000, () => {
      console.log('🚀 Servidor corriendo en http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });