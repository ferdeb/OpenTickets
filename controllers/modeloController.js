const { Modelo, Marca } = require('../models');

exports.listar = async (req, res) => {
    const modelos = await Modelo.findAll({ include: [
        { model: Marca, as: 'marca' }
      ]
    });
    res.render('modelos/index', { modelos });
};

exports.formCrear = async (req, res) => {
    const [modelos, marcas] = await Promise.all([
        Modelo.findAll(),
        Marca.findAll()
      ]);
      res.render('modelos/crear', { modelos, marcas });
    };

exports.crear = async (req, res) => {
    await Modelo.create(req.body);
    res.redirect('/modelos');
};

exports.formEditar = async (req, res) => {
    const [modelos, marcas] = await Promise.all([
        Modelo.findByPk(req.params.id),
        Marca.findAll()
      ]);
      res.render('modelos/editar', { modelos, marcas });
};
exports.editar = async (req, res) => {
    await Modelo.update(req.body, {
        where: { modelo_id: req.params.id }
    });
    res.redirect('/modelos');
};

exports.eliminar = async (req, res) => {
    await Modelo.destroy({ where: { modelo_id: req.params.id } });
    res.redirect('/modelos');
};