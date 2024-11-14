const db = require("../db/db");

const listarEstoque = (req, res) => {
  db.all(
      `SELECT e.id_estoque, e.id_produto, e.qtd_estoque, e.dt_ultima_atualizacao,
      p.nm_produto
      FROM Estoque e
      JOIN Produto p ON e.id_produto = p.id_produto
      ORDER BY e.dt_ultima_atualizacao DESC`,
      [],
      (err, estoque) => {
          if (err) {
              console.error("Erro ao listar o estoque:", err.message);
              return res.status(500).json({ mensagem: "Erro interno do servidor" });
          }
          if (estoque.length === 0) {
              return res.status(404).json({ mensagem: "Estoque vazio" });
          }
          return res.status(200).json(estoque);
      }
  );
};

module.exports = { listarEstoque };