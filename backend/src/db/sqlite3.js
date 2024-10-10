const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

//Cria a tabela produtos se ela não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      quantidade INTEGER NOT NULL,
      preco REAL NOT NULL,
      categoria TEXT
    );
  `);
});

module.exports = db;
