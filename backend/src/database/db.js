const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error('Erro ao conectar no banco', err);
  } else {
    console.log('Banco conectado');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL,
      resolution_time REAL NOT NULL,
      channel TEXT NOT NULL,
      owner TEXT NOT NULL,
      notes TEXT NOT NULL
    )
  `);

  if (process.env.NODE_ENV !== 'production') {
    db.run('DELETE FROM tickets', (err) => {
      if (err) {
        console.error('Erro ao limpar tickets em desenvolvimento', err);
      } else {
        console.log('Tickets apagados ao iniciar o servidor (modo desenvolvimento)');
      }
    });
  }
});

module.exports = db;