const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((req, res, next) => {
  res.status(404).json({
    mensagem: "Rota não encontrada. Verifique a URL."
  });
});


const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});