const express = require('express');
const { cadastrarProduto, listarProdutos, excluirProduto, detalharProduto, editarProduto } = require('./controller/produtos');

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


module.exports = routes;