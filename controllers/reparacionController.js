const { Reparacion, Ticket } = require('../models');

exports.listar = async (req, res) => {
    const reparaciones = await Reparacion.findAll({ include: [
        { model: Ticket, as: 'tickets' }
      ]
    });
    // Formatear fecha como string YYYY-MM-DD
    const reparacionesFormateadas = reparaciones.map(t => {
        return {
            ...t.get(),
            fecha: t.fecha ? new Date(t.fecha).toISOString().slice(0, 10) : null
        };
    });
    res.render('reparaciones/index', { reparaciones: reparacionesFormateadas });
};

exports.formCrear = async (req, res) => {
    const [reparaciones, tickets] = await Promise.all([
        Reparacion.findAll(),
        Ticket.findAll()
      ]);
      res.render('reparaciones/crear', { reparaciones, tickets });
    };

exports.crear = async (req, res) => {
    await Reparacion.create(req.body);
    res.redirect('/reparaciones');
};

exports.formEditar = async (req, res) => {
    const [reparaciones, tickets] = await Promise.all([
        Reparacion.findByPk(req.params.id),
        Ticket.findAll()
      ]);
      res.render('reparaciones/editar', { reparaciones, tickets });
};
exports.editar = async (req, res) => {
    await Reparacion.update(req.body, {
        where: { reparacion_id: req.params.id }
    });
    res.redirect('/reparaciones');
};

exports.eliminar = async (req, res) => {
    await Componente.destroy({ where: { reparacion_id: req.params.id } });
    res.redirect('/reparaciones');
};