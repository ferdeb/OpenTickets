const { Estado_Articulo, Articulo } = require('../models');

// SELECT
exports.listar = async (req, res) => {
    const estado_articulos = await Estado_Articulo.findAll({ include: Articulo });
    res.render('estado_articulos/index', {
        estado_articulos,
        error: req.query.error
    });
};

// CREATE
exports.formCrear = (req, res) => {
    res.render('estado_articulos/crear');
};
// CREATE
exports.crear = async (req, res) => {
    await Estado_Articulo.create(req.body);
    res.redirect('/estado_articulos');
};

exports.formEditar = async (req, res) => {
    const estado_articulo = await Estado_Articulo.findByPk(req.params.id);
    res.render('estado_articulos/editar', { estado_articulo });
};

exports.editar = async (req, res) => {
    await Estado_Articulo.update(req.body, {
        where: { estado_articulo_id: req.params.id }
    });
    res.redirect('/estado_articulos');
};

exports.eliminar = async (req, res) => {
    try {
        await Estado_Articulo.destroy({ where: { estado_articulo_id: req.params.id } });
        res.redirect('/estado_articulos');
    } catch (error) {
        if (error.parent && error.parent.errno === 1451) { // Error de foreign key
            res.redirect('/estado_articulos?error=relacion');
        } else {
            res.redirect('/estado_articulos?error=desconocido');
        }
    }
};