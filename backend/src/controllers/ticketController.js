const db = require('../database/db');

const validCategories = [
  'Logística',
  'Financeiro',
  'Tecnologia',
  'Atendimento'
];

const validStatus = [
  'Pendente',
  'Em Andamento',
  'Resolvido'
];

const validChannels = [
  'Chat',
  'E-mail',
  'Telefone'
];

const isValidDate = (dateString) => {
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(`${dateString}T00:00:00`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
};

exports.getTickets = (req, res) => {
  db.all(
    'SELECT * FROM tickets ORDER BY date ASC, id ASC',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar tickets.' });
      }

      res.json(rows);
    }
  );
};

exports.createTicket = (req, res) => {
  const {
    date,
    category,
    status,
    resolution_time,
    channel,
    owner,
    notes
  } = req.body;

  const trimmedOwner = typeof owner === 'string' ? owner.trim() : '';
  const trimmedNotes = typeof notes === 'string' ? notes.trim() : '';
  const numericResolutionTime = Number(resolution_time);

  if (
    !date ||
    !category ||
    !status ||
    !channel ||
    !trimmedOwner ||
    !trimmedNotes ||
    resolution_time === undefined ||
    resolution_time === null ||
    resolution_time === ''
  ) {
    return res.status(400).json({
      error: 'Todos os campos são obrigatórios.'
    });
  }

  if (!isValidDate(date)) {
    return res.status(400).json({
      error: 'Data inválida.'
    });
  }

  if (!validCategories.includes(category)) {
    return res.status(400).json({
      error: 'Categoria inválida.'
    });
  }

  if (!validStatus.includes(status)) {
    return res.status(400).json({
      error: 'Status inválido.'
    });
  }

  if (!validChannels.includes(channel)) {
    return res.status(400).json({
      error: 'Canal inválido.'
    });
  }

  if (Number.isNaN(numericResolutionTime) || numericResolutionTime <= 0) {
    return res.status(400).json({
      error: 'O tempo deve ser um número maior que zero.'
    });
  }

  if (trimmedOwner.length > 60) {
    return res.status(400).json({
      error: 'O responsável pode ter no máximo 60 caracteres.'
    });
  }

  if (trimmedNotes.length > 200) {
    return res.status(400).json({
      error: 'As observações podem ter no máximo 200 caracteres.'
    });
  }

  const query = `
    INSERT INTO tickets
    (date, category, status, resolution_time, channel, owner, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      date,
      category,
      status,
      numericResolutionTime,
      channel,
      trimmedOwner,
      trimmedNotes
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar ticket.' });
      }

      res.status(201).json({
        message: 'Ticket criado com sucesso.',
        id: this.lastID
      });
    }
  );
};