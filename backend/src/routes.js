const express = require('express');
const { cadastrarProduto, listarProdutos, excluirProduto, detalharProduto, editarProduto } = require('./controller/produtos');
const { cadastrarFornecedor, listarFornecedores, excluirFornecedor, detalharFornecedor, editarFornecedor } = require('./controller/fornecedor');
const { cadastrarMarca, listarMarcas, excluirMarca, detalharMarca, editarMarca } = require('./controller/marca');
const { cadastrarMtvSaida, listarMtvSaida, excluirMtvSaida, detalharMtvSaida, editarMtvSaida } = require('./controller/mtv_saida');

const routes = express();

routes.get("/frase", (req, res) => {
  res.send("Bem-vindo ao estoque do Tatu Bola");
});

// produtos
routes.get("/produto", listarProdutos);
routes.get("/produto/:id_produto", detalharProduto);
routes.post("/produto", cadastrarProduto);
routes.delete("/produto/:id_produto", excluirProduto);
routes.put("/produto/:id_produto", editarProduto);

// fornecedores
routes.get("/fornecedor", listarFornecedores);
routes.get("/fornecedor/:id_fornecedor", detalharFornecedor);
routes.post("/fornecedor", cadastrarFornecedor);
routes.delete("/fornecedor/:id_fornecedor", excluirFornecedor);
routes.put("/fornecedor/:id_fornecedor", editarFornecedor);

// marcas
routes.get("/marca", listarMarcas);
routes.get("/marca/:id_marca", detalharMarca);
routes.post("/marca", cadastrarMarca);
routes.delete("/marca/:id_marca", excluirMarca);
routes.put("/marca/:id_marca", editarMarca);

// motivo saida
routes.get("/mtv_saida", listarMtvSaida);
routes.get("/mtv_saida/:id_mtv_saida", detalharMtvSaida);
routes.post("/mtv_saida", cadastrarMtvSaida);
routes.delete("/mtv_saida/:id_mtv_saida", excluirMtvSaida);
routes.put("/mtv_saida/:id_mtv_saida", editarMtvSaida);


module.exports = routes;