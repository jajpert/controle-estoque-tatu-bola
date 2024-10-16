const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados (ou criar se não existir)
let db = new sqlite3.Database('estoque_tatu_bola.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});

// Criar a tabela Produto
db.run(`
    CREATE TABLE IF NOT EXISTS Produto (
        id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
        nm_produto TEXT NOT NULL,
        unid_medida TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Criar a tabela Fornecedor
db.run(`
    CREATE TABLE IF NOT EXISTS Fornecedor (
        id_fornecedor INTEGER PRIMARY KEY AUTOINCREMENT,
        nm_fornecedor TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Criar a tabela Motivo_Saida
db.run(`
    CREATE TABLE IF NOT EXISTS Motivo_Saida (
        id_mtv_saida INTEGER PRIMARY KEY AUTOINCREMENT,
        nm_mtv_saida TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Criar a tabela Estoque
db.run(`
    CREATE TABLE IF NOT EXISTS Estoque (
        id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
        id_produto INTEGER NOT NULL,
        id_fornecedor INTEGER NOT NULL,
        qtd_produto INTEGER NOT NULL,
        vl_compra REAL NOT NULL,
        dt_entrada DATETIME NOT NULL,
        dt_validade DATETIME NOT NULL,
        FOREIGN KEY (id_produto) REFERENCES Produto(id_produto),
        FOREIGN KEY (id_fornecedor) REFERENCES Fornecedor(id_fornecedor)
    )
`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Criar a tabela Saida
db.run(`
    CREATE TABLE IF NOT EXISTS Saida (
        id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
        id_produto INTEGER NOT NULL,
        id_fornecedor INTEGER NOT NULL,
        qtd_produto INTEGER NOT NULL,
        vl_compra REAL NOT NULL,
        dt_saida DATETIME NOT NULL,
        dt_validade DATETIME,
        id_mtv_saida INTEGER NOT NULL,
        FOREIGN KEY (id_produto) REFERENCES Produto(id_produto),
        FOREIGN KEY (id_fornecedor) REFERENCES Fornecedor(id_fornecedor),
        FOREIGN KEY (id_mtv_saida) REFERENCES Motivo_Saida(id_mtv_saida)
    )
`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Fechar a conexão com o banco de dados
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conexão com o banco de dados encerrada.');
});


module.exports = db;