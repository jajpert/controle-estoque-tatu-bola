const db = require("../db/db");

const cadastrarEntrada = (req, res) => {
  const { id_produto, id_fornecedor, id_marca, qtd_produto, vl_compra, dt_entrada, dt_validade } = req.body;

  // Validação de campos obrigatórios
  const campoObrigatorios = [
      { campo: id_produto, nomeCampo: "id_produto" },
      { campo: id_fornecedor, nomeCampo: "id_fornecedor" },
      { campo: id_marca, nomeCampo: "id_marca" },
      { campo: qtd_produto, nomeCampo: "qtd_produto" },
      { campo: vl_compra, nomeCampo: "vl_compra" },
      { campo: dt_entrada, nomeCampo: "dt_entrada" },
      { campo: dt_validade, nomeCampo: "dt_validade" }
  ];

  const campoVazio = campoObrigatorios
      .filter(({ campo }) => campo === undefined || campo === null || campo === "")
      .map(({ nomeCampo }) => nomeCampo);

  if (campoVazio.length > 0) {
      return res.status(400).json({ mensagem: `Os campos ${campoVazio.join(", ")} são obrigatórios` });
  }

  // Insere a entrada
  db.run(
      `INSERT INTO Entrada (id_produto, id_fornecedor, id_marca, qtd_produto, vl_compra, dt_entrada, dt_validade)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id_produto, id_fornecedor, id_marca, qtd_produto, vl_compra, dt_entrada, dt_validade],
      function (err) {
          if (err) {
              console.error("Erro ao cadastrar a entrada:", err.message);
              return res.status(500).json({ mensagem: "Erro interno do servidor" });
          }

          // Verifica se o produto já existe no estoque
          db.get(`SELECT * FROM Estoque WHERE id_produto = ?`, [id_produto], (err, produtoEstoque) => {
              if (err) {
                  console.error("Erro ao verificar o estoque:", err.message);
                  return res.status(500).json({ mensagem: "Erro interno do servidor ao verificar estoque" });
              }

              if (produtoEstoque) {
                  // Se o produto já existe no estoque, atualiza a quantidade
                  db.run(
                        `UPDATE Estoque
                        SET qtd_estoque = qtd_estoque + ?, dt_ultima_atualizacao = CURRENT_TIMESTAMP
                        WHERE id_produto = ?`,
                      [qtd_produto, id_produto],
                      function (err) {
                          if (err) {
                              console.error("Erro ao atualizar o estoque:", err.message);
                              return res.status(500).json({ mensagem: "Erro interno do servidor ao atualizar estoque" });
                          }
                          return res.status(201).json("Entrada registrada e estoque atualizado com sucesso!");
                      }
                  );
              } else {
                  // Se o produto não existe no estoque, insere um novo registro
                  db.run(
                      ` INSERT INTO Estoque (id_produto, qtd_estoque, dt_ultima_atualizacao)
                        VALUES (?, ?, CURRENT_TIMESTAMP)`,
                      [id_produto, qtd_produto],
                      function (err) {
                          if (err) {
                              console.error("Erro ao inserir no estoque:", err.message);
                              return res.status(500).json({ mensagem: "Erro interno do servidor ao inserir no estoque" });
                          }
                          return res.status(201).json("Entrada registrada e produto adicionado ao estoque com sucesso!");
                      }
                  );
              }
          });
      }
  );
};


const listarEntradas = (req, res) => {
  db.all(
      `SELECT e.id_entrada, e.id_produto, e.id_fornecedor, e.id_marca, e.qtd_produto, 
      e.vl_compra, e.dt_entrada, e.dt_validade, p.nm_produto, f.nm_fornecedor, m.nm_marca 
      FROM Entrada e
      JOIN Produto p ON e.id_produto = p.id_produto
      JOIN Fornecedor f ON e.id_fornecedor = f.id_fornecedor
      JOIN Marca m ON e.id_marca = m.id_marca`,
      [],
      (err, entradas) => {
          if (err) {
              console.error("Erro ao listar as entradas:", err.message);
              return res.status(500).json({ mensagem: "Erro interno do servidor" });
          }
          if (entradas.length === 0) {
              return res.status(404).json({ mensagem: "Nenhuma entrada encontrada" });
          }
          return res.status(200).json(entradas);
      }
  );
};


const detalharEntrada = (req, res) => {
  const { id_entrada } = req.params;

  db.get(
      `SELECT e.id_entrada, e.id_produto, e.id_fornecedor, e.id_marca, e.qtd_produto, 
      e.vl_compra, e.dt_entrada, e.dt_validade, p.nm_produto, f.nm_fornecedor, m.nm_marca 
      FROM Entrada e
      JOIN Produto p ON e.id_produto = p.id_produto
      JOIN Fornecedor f ON e.id_fornecedor = f.id_fornecedor
      JOIN Marca m ON e.id_marca = m.id_marca
      WHERE e.id_entrada = ?`,
      [id_entrada],
      (err, entrada) => {
          if (err) {
              console.error("Erro ao buscar a entrada:", err.message);
              return res.status(500).json({ mensagem: "Erro interno do servidor" });
          }
          if (!entrada) {
              return res.status(404).json({ mensagem: "Entrada não encontrada" });
          }
          return res.status(200).json(entrada);
      }
  );
};


module.exports = {
  cadastrarEntrada,
  listarEntradas,
  detalharEntrada
};