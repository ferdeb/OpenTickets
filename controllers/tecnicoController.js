const { Tecnico, Ticket } = require('../models');

// SELECT
exports.listar = async (req, res) => {
    const tecnicos = await Tecnico.findAll({ include: Ticket });
    res.render('tecnicos/index', {
        tecnicos,
        error: req.query.error
    });
};

// CREATE
exports.formCrear = (req, res) => {
    res.render('tecnicos/crear');
};
// CREATE
exports.crear = async (req, res) => {
    await Tecnico.create(req.body);
    res.redirect('/tecnicos');
};

exports.formEditar = async (req, res) => {
    const tecnico = await Tecnico.findByPk(req.params.id);
    res.render('tecnicos/editar', { tecnico });
};

exports.editar = async (req, res) => {
    await Tecnico.update(req.body, {
        where: { tecnico_id: req.params.id }
    });
    res.redirect('/tecnicos');
};

exports.eliminar = async (req, res) => {
    try {
        await Tecnico.destroy({ where: { tecnico_id: req.params.id } });
        res.redirect('/tecnicos');
    } catch (error) {
        if (error.parent && error.parent.errno === 1451) { // Error de foreign key
            res.redirect('/tecnicos?error=relacion');
        } else {
            res.redirect('/tecnicos?error=desconocido');
        }
    }
};