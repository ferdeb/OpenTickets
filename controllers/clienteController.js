const { Cliente, Articulo } = require('../models');

// SELECT
exports.listar = async (req, res) => {
    const clientes = await Cliente.findAll({ include: Articulo });
    res.render('clientes/index', {
        clientes,
        error: req.query.error
    });
};

// CREATE
exports.formCrear = (req, res) => {
    res.render('clientes/crear');
};
// CREATE
exports.crear = async (req, res) => {
    await Cliente.create(req.body);
    res.redirect('/clientes');
};

exports.formEditar = async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    res.render('clientes/editar', { cliente });
};

exports.editar = async (req, res) => {
    await Cliente.update(req.body, {
        where: { cliente_id: req.params.id }
    });
    res.redirect('/clientes');
};

exports.eliminar = async (req, res) => {
    try {
        await Cliente.destroy({ where: { cliente_id: req.params.id } });
        res.redirect('/clientes');
    } catch (error) {
        if (error.parent && error.parent.errno === 1451) { // Error de foreign key
            res.redirect('/clientes?error=relacion');
        } else {
            res.redirect('/clientes?error=desconocido');
        }
    }
};