const { Componente, Modelo } = require('../models');

exports.listar = async (req, res) => {
    const componentes = await Componente.findAll({ include: [
        { model: Modelo, as: 'modelos' }
      ]
    });
    res.render('componentes/index', { componentes });
};

exports.formCrear = async (req, res) => {
    const [componentes, modelos] = await Promise.all([
        Componente.findAll(),
        Modelo.findAll()
      ]);
      res.render('componentes/crear', { componentes, modelos });
    };

exports.crear = async (req, res) => {
    await Componente.create(req.body);
    res.redirect('/componentes');
};

exports.formEditar = async (req, res) => {
    const [componentes, modelos] = await Promise.all([
        Componente.findByPk(req.params.id),
        Modelo.findAll()
      ]);
      res.render('componentes/editar', { componentes, modelos });
};
exports.editar = async (req, res) => {
    await Modelo.update(req.body, {
        where: { componente_id: req.params.id }
    });
    res.redirect('/componentes');
};

exports.eliminar = async (req, res) => {
    await Componente.destroy({ where: { componente_id: req.params.id } });
    res.redirect('/componentes');
};