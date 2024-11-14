const db = require("../db/db");

const cadastrarSaida = (req, res) => {
  const { id_produto, id_fornecedor, qtd_produto, vl_compra, dt_saida, dt_validade, id_mtv_saida } = req.body;

  const camposObrigatorios = [
      { campo: id_produto, nomeCampo: "id_produto" },
      { campo: id_fornecedor, nomeCampo: "id_fornecedor" },
      { campo: qtd_produto, nomeCampo: "qtd_produto" },
      { campo: vl_compra, nomeCampo: "vl_compra" },
      { campo: dt_saida, nomeCampo: "dt_saida" },
      { campo: id_mtv_saida, nomeCampo: "id_mtv_saida" }
  ];

  const camposVazios = camposObrigatorios
      .filter(({ campo }) => campo === undefined || campo === null || campo === "")
      .map(({ nomeCampo }) => nomeCampo);

  if (camposVazios.length > 0) {
      return res.status(400).json({ mensagem: `Os campos ${camposVazios.join(", ")} são obrigatórios` });
  }

  // Verificar se o produto existe no estoque
  db.get("SELECT * FROM Estoque WHERE id_produto = ?", [id_produto], (err, produtoEstoque) => {
      if (err) {
          console.error("Erro ao verificar o estoque do produto:", err.message);
          return res.status(500).json({ mensagem: "Erro interno do servidor" });
      }

      if (!produtoEstoque) {
          return res.status(404).json({ mensagem: "Produto não encontrado no estoque" });
      }

      if (produtoEstoque.qtd_estoque < qtd_produto) {
          return res.status(400).json({ mensagem: "Quantidade insuficiente em estoque" });
      }

      // Cadastrar a saída
      db.run(
          `INSERT INTO Saida (id_produto, id_fornecedor, qtd_produto, vl_compra, dt_saida, dt_validade, id_mtv_saida)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [id_produto, id_fornecedor, qtd_produto, vl_compra, dt_saida, dt_validade, id_mtv_saida],
          function (err) {
              if (err) {
                  console.error("Erro ao cadastrar a saída:", err.message);
                  return res.status(500).json({ mensagem: "Erro interno do servidor" });
              }

              // Atualizar a quantidade no estoque
              const novaQtdEstoque = produtoEstoque.qtd_estoque - qtd_produto;
              const dataAtualizacao = new Date().toISOString();

              db.run(
                  `UPDATE Estoque SET qtd_estoque = ?, dt_ultima_atualizacao = ? WHERE id_produto = ?`,
                  [novaQtdEstoque, dataAtualizacao, id_produto],
                  (err) => {
                      if (err) {
                          console.error("Erro ao atualizar o estoque:", err.message);
                          return res.status(500).json({ mensagem: "Erro interno do servidor" });
                      }
                      return res.status(201).json("Saída cadastrada e estoque atualizado com sucesso!");
                  }
              );
          }
      );
  });
};


const listarSaidas = (req, res) => {
  db.all(
      `SELECT s.id_saida, s.id_produto, s.id_fornecedor, s.qtd_produto, 
      s.vl_compra, s.dt_saida, s.dt_validade, s.id_mtv_saida,
      p.nm_produto, f.nm_fornecedor, ms.descricao AS motivo_saida 
      FROM Saida s
      JOIN Produto p ON s.id_produto = p.id_produto
      JOIN Fornecedor f ON s.id_fornecedor = f.id_fornecedor
      JOIN Motivo_Saida ms ON s.id_mtv_saida = ms.id_mtv_saida`,
      [],
      (err, saidas) => {
          if (err) {
              console.error("Erro ao listar as saídas:", err.message);
              return res.status(500).json({ mensagem: "Erro interno do servidor" });
          }
          if (saidas.length === 0) {
              return res.status(404).json({ mensagem: "Nenhuma saída encontrada" });
          }
          return res.status(200).json(saidas);
      }
  );
};

const detalharSaida = (req, res) => {
  const { id_saida } = req.params;

  db.get(
      `SELECT s.id_saida, s.id_produto, s.id_fornecedor, s.qtd_produto, 
      s.vl_compra, s.dt_saida, s.dt_validade, s.id_mtv_saida,
      p.nm_produto, f.nm_fornecedor, ms.descricao AS motivo_saida 
      FROM Saida s
      JOIN Produto p ON s.id_produto = p.id_produto
      JOIN Fornecedor f ON s.id_fornecedor = f.id_fornecedor
      JOIN Motivo_Saida ms ON s.id_mtv_saida = ms.id_mtv_saida
      WHERE s.id_saida = ?`,
      [id_saida],
      (err, saida) => {
          if (err) {
              console.error("Erro ao buscar a saída:", err.message);
              return res.status(500).json({ mensagem: "Erro interno do servidor" });
          }
          if (!saida) {
              return res.status(404).json({ mensagem: "Saída não encontrada" });
          }
          return res.status(200).json(saida);
      }
  );
};



module.exports = {
  cadastrarSaida,
  listarSaidas,
  detalharSaida
};