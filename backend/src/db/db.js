const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Especifique o caminho do banco de dados existente
const dbPath = path.join(__dirname, '../db/estoque_tatu_bola.db');

// Conectar ao banco de dados existente
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Exportar a conexão do banco de dados
module.exports = db;
