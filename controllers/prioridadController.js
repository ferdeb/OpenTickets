const { Prioridad, Ticket } = require('../models');

// SELECT
exports.listar = async (req, res) => {
    const prioridades = await Prioridad.findAll({ include: Ticket });
    res.render('prioridades/index', {
        prioridades,
        error: req.query.error
    });
};

// CREATE
exports.formCrear = (req, res) => {
    res.render('prioridades/crear');
};
// CREATE
exports.crear = async (req, res) => {
    await Prioridad.create(req.body);
    res.redirect('/prioridades');
};

exports.formEditar = async (req, res) => {
    const prioridad = await Prioridad.findByPk(req.params.id);
    res.render('prioridades/editar', { prioridad });
};

exports.editar = async (req, res) => {
    await Prioridad.update(req.body, {
        where: { prioridad_id: req.params.id }
    });
    res.redirect('/prioridades');
};

exports.eliminar = async (req, res) => {
    try {
        await Prioridad.destroy({ where: { prioridad_id: req.params.id } });
        res.redirect('/prioridades');
    } catch (error) {
        if (error.parent && error.parent.errno === 1451) { // Error de foreign key
            res.redirect('/prioridades?error=relacion');
        } else {
            res.redirect('/prioridades?error=desconocido');
        }
    }
};