const express = require('express');

const routes = express();

routes.get("/frase", (req, res) => {
  res.send("Bem-vindo ao estoque do Tatu Bola");
});

module.exports = routes;