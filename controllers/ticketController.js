const { Ticket, Articulo, Prioridad, Tecnico, Reparacion, Estado_Ticket  } = require('../models');

exports.listar = async (req, res) => {
    // Alias para poder usar listar, crear y editar.ejs, para multiples relaciones, solo asi funciona
    const tickets = await Ticket.findAll({ include: [
        { model: Articulo,      as: 'articulo'      },
        { model: Prioridad,     as: 'prioridad'    },
        { model: Tecnico,       as: 'tecnico'       },
        { model: Estado_Ticket, as: 'estado_ticket' }
      ]
    });
    // Formatear fecha como string YYYY-MM-DD
    const ticketsFormateados = tickets.map(t => {
        return {
            ...t.get(),
            fecha: t.fecha ? new Date(t.fecha).toISOString().slice(0, 10) : null
        };
    });
    res.render('tickets/index', { tickets: ticketsFormateados });
};

exports.formCrear = async (req, res) => {
    const [articulo, prioridad, tecnico, estado_ticket] = await Promise.all([
        Articulo.findAll(),
        Prioridad.findAll(),
        Tecnico.findAll(),
        Estado_Ticket.findAll()
      ]);
      res.render('tickets/crear', { articulo, prioridad, tecnico, estado_ticket });
    };
    
exports.crear = async (req, res) => {
    await Ticket.create(req.body);
    res.redirect('/tickets');
};

exports.formEditar = async (req, res) => {
    const [ticket, articulo, prioridad, tecnico, estado_ticket] = await Promise.all([
        Ticket.findByPk(req.params.id),
        Articulo.findAll(),
        Prioridad.findAll(),
        Tecnico.findAll(),
        Estado_Ticket.findAll()
      ]);
      res.render('tickets/editar', { ticket, articulo, prioridad, tecnico, estado_ticket });
};

exports.editar = async (req, res) => {
    await Ticket.update(req.body, {
        where: { ticket_id: req.params.id }
    });
    res.redirect('/tickets');
};

exports.eliminar = async (req, res) => {
    await Ticket.destroy({ where: { ticket_id: req.params.id } });
    res.redirect('/tickets');
};