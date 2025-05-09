const { Estado_Ticket, Ticket } = require('../models');

// SELECT
exports.listar = async (req, res) => {
    const estado_tickets = await Estado_Ticket.findAll({ include: Ticket });
    res.render('estado_tickets/index', {
        estado_tickets,
        error: req.query.error
    });
};

// CREATE
exports.formCrear = (req, res) => {
    res.render('estado_tickets/crear');
};
// CREATE
exports.crear = async (req, res) => {
    await Estado_Ticket.create(req.body);
    res.redirect('/estado_tickets');
};

exports.formEditar = async (req, res) => {
    const estado_ticket = await Estado_Ticket.findByPk(req.params.id);
    res.render('estado_tickets/editar', { estado_ticket });
};

exports.editar = async (req, res) => {
    await Estado_Ticket.update(req.body, {
        where: { estado_ticket_id: req.params.id }
    });
    res.redirect('/estado_tickets');
};

exports.eliminar = async (req, res) => {
    try {
        await Estado_Ticket.destroy({ where: { estado_ticket_id: req.params.id } });
        res.redirect('/estado_tickets');
    } catch (error) {
        if (error.parent && error.parent.errno === 1451) { // Error de foreign key
            res.redirect('/estado_tickets?error=relacion');
        } else {
            res.redirect('/estado_tickets?error=desconocido');
        }
    }
};