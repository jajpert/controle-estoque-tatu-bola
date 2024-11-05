const db = require("../db/db");

const cadastrarProduto = (req, res) => {
    const { nm_produto, unid_medida } = req.body;

    const camposObrigatorios = [
        { campo: nm_produto, nomeCampo: "nm_produto" },
        { campo: unid_medida, nomeCampo: "unid_medida" }
    ];

    const camposVazio = camposObrigatorios
        .filter(({ campo }) => campo === undefined || campo === null || campo.trim() === "")
        .map(({ nomeCampo }) => nomeCampo);

    if (camposVazio.length > 0) {
        return res.status(400).json({ mensagem: `Os campos ${camposVazio.join(", ")} são obrigatórios` });
    }

    db.get("SELECT * FROM Produto WHERE nm_produto = ?", [nm_produto], (err, produtoExistente) => {
        if (err) {
            console.error("Erro ao verificar produto existente:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }

        if (produtoExistente) {
            return res.status(400).json("O produto já está cadastrado");
        }

        db.run("INSERT INTO Produto (nm_produto, unid_medida) VALUES (?, ?)", [nm_produto, unid_medida], function(err) {
            if (err) {
                console.error("Erro ao cadastrar o produto:", err.message);
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            }
            return res.status(201).json("O produto foi cadastrado com sucesso!");
        });
    });
};

const listarProdutos = (req, res) => {
    db.all("SELECT * FROM Produto", [], (err, produtos) => {
        if (err) {
            console.error("Erro ao listar os produtos:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (produtos.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum produto cadastrado" });
        }
        return res.status(200).json(produtos);
    });
};

const editarProduto = (req, res) => {
    const { id_produto } = req.params;
    const { nm_produto, unid_medida } = req.body;

    db.get("SELECT * FROM Produto WHERE id_produto = ?", [id_produto], (err, produto) => {
        if (err) {
            console.error("Erro ao verificar produto:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }

        db.run("UPDATE Produto SET nm_produto = ?, unid_medida = ? WHERE id_produto = ?", [nm_produto, unid_medida, id_produto], function(err) {
            if (err) {
                console.error("Erro ao atualizar o produto:", err.message);
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            }
            return res.status(204).send();
        });
    });
};

const excluirProduto = (req, res) => {
    const { id_produto } = req.params;

    db.get("SELECT * FROM Produto WHERE id_produto = ?", [id_produto], (err, produto) => {
        if (err) {
            console.error("Erro ao verificar produto:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }

        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        db.run("DELETE FROM Produto WHERE id_produto = ?", [id_produto], function(err) {
            if (err) {
                console.error("Erro ao excluir o produto:", err.message);
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            }
            return res.status(200).json("O produto foi excluído com sucesso.");
        });
    });
};

const detalharProduto = (req, res) => {
    const { id_produto } = req.params;

    db.get("SELECT nm_produto, unid_medida FROM Produto WHERE id_produto = ?", [id_produto], (err, produto) => {
        if (err) {
            console.error("Erro ao detalhar o produto:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }
        return res.status(200).json(produto);
    });
};

module.exports = {
    cadastrarProduto,
    listarProdutos,
    editarProduto,
    excluirProduto,
    detalharProduto
};
