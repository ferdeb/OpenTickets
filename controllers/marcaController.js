const { Marca, Modelo } = require('../models');

// SELECT
exports.listar = async (req, res) => {
    const marcas = await Marca.findAll({ include: Modelo });
    res.render('marcas/index', {
        marcas,
        error: req.query.error
    });
};

// CREATE
exports.formCrear = (req, res) => {
    res.render('marcas/crear');
};
// CREATE
exports.crear = async (req, res) => {
    await Marca.create(req.body);
    res.redirect('/marcas');
};

exports.formEditar = async (req, res) => {
    const marca = await Marca.findByPk(req.params.id);
    res.render('marcas/editar', { marca });
};

exports.editar = async (req, res) => {
    await Marca.update(req.body, {
        where: { marca_id: req.params.id }
    });
    res.redirect('/marcas');
};

exports.eliminar = async (req, res) => {
    try {
        await Marca.destroy({ where: { marca_id: req.params.id } });
        res.redirect('/marcas');
    } catch (error) {
        if (error.parent && error.parent.errno === 1451) { // Error de foreign key
            res.redirect('/marcas?error=relacion');
        } else {
            res.redirect('/marcas?error=desconocido');
        }
    }
};