const { Articulo, Cliente, Modelo, Estado_Articulo } = require('../models');

exports.listar = async (req, res) => {
    // Alias para poder usar listar, crear y editar.ejs, para multiples relaciones, solo asi funciona
    const articulos = await Articulo.findAll({ include: [
        { model: Cliente,         as: 'cliente'        },
        { model: Modelo,          as: 'modelo'         },
        { model: Estado_Articulo, as: 'estado_articulo' }
      ]
    });
    // Formatear fecha como string YYYY-MM-DD
    const tareasFormateadas = articulos.map(t => {
        return {
            ...t.get(),
            fecha_ingreso: t.fecha_ingreso ? new Date(t.fecha_ingreso).toISOString().slice(0, 10) : null
        };
    });
    res.render('articulos/index', { articulos: tareasFormateadas });
};

exports.formCrear = async (req, res) => {
    const [clientes, modelos, estado_articulos] = await Promise.all([
        Cliente.findAll(),
        Modelo.findAll(),
        Estado_Articulo.findAll()
      ]);
      res.render('articulos/crear', { clientes, modelos, estado_articulos });
    };
    
exports.crear = async (req, res) => {
    await Articulo.create(req.body);
    res.redirect('/articulos');
};

exports.formEditar = async (req, res) => {
    const [articulo, clientes, modelos, estado_articulos] = await Promise.all([
        Articulo.findByPk(req.params.id),
        Cliente.findAll(),
        Modelo.findAll(),
        Estado_Articulo.findAll()
      ]);
      res.render('articulos/editar', { articulo, clientes, modelos, estado_articulos });
};

exports.editar = async (req, res) => {
    await Articulo.update(req.body, {
        where: { articulo_id: req.params.id }
    });
    res.redirect('/articulos');
};

exports.eliminar = async (req, res) => {
    await Articulo.destroy({ where: { articulo_id: req.params.id } });
    res.redirect('/articulos');
};