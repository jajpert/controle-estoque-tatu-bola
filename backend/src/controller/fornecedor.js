const db = require("../db/db");

const cadastrarFornecedor = (req, res) => {
    const { nm_fornecedor  } = req.body;

    const campoObrigatorios = [
        { campo: nm_fornecedor , nomeCampo: "nm_fornecedor" }
    ];

    const campoVazio = campoObrigatorios
        .filter(({ campo }) => campo === undefined || campo === null || campo.trim() === "")
        .map(({ nomeCampo }) => nomeCampo);

    if (campoVazio.length > 0) {
        return res.status(400).json({ mensagem: `O campo nm_fornecedor é obrigatório` });
    }

    db.get("SELECT * FROM Fornecedor WHERE nm_fornecedor = ?", [nm_fornecedor], (err, fornecedorExistente) => {
        if (err) {
        console.error("Erro ao verificar fornecedor existente:", err.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }

        if (fornecedorExistente) {
        return res.status(400).json("O fornecedor já está cadastrado");
        }

        db.run("INSERT INTO Fornecedor (nm_fornecedor) VALUES (?)", [nm_fornecedor], function(err) {
        if (err) {
            console.error("Erro ao cadastrar o fornecedor:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        return res.status(201).json("O fornecedor foi cadastrado com sucesso!");
        });
    });
};

const listarFornecedores = (req, res) => {
    db.all("SELECT * FROM Fornecedor", [], (err, fornecedores) => {
        if (err) {
            console.error("Erro ao listar os fornecedores:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (fornecedores.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum fornecedor cadastrado" });
        }
        return res.status(200).json(fornecedores);
    });
};

const editarFornecedor = (req, res) => {
    const { id_fornecedor } = req.params;
    const { nm_fornecedor } = req.body;

    db.get("SELECT * FROM Fornecedor WHERE id_fornecedor = ?", [id_fornecedor], (err, fornecedor) => {
        if (err) {
            console.error("Erro ao verificar fornecedor:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (!fornecedor) {
            return res.status(404).json({ mensagem: "Fornecedor não encontrado" });
        }

        db.run("UPDATE Fornecedor SET nm_fornecedor  = ? WHERE id_fornecedor = ?", [nm_fornecedor, id_fornecedor], function(err) {
            if (err) {
                console.error("Erro ao atualizar o fornecedor:", err.message);
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            }
            return res.status(204).send();
        });
    });
};

const excluirFornecedor = (req, res) => {
    const { id_fornecedor } = req.params;

    db.get("SELECT * FROM Fornecedor WHERE id_fornecedor = ?", [id_fornecedor], (err, fornecedor) => {
        if (err) {
            console.error("Erro ao verificar fornecedor:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }

        if (!fornecedor) {
            return res.status(404).json({ mensagem: "Fornecedor não encontrado." });
        }

        db.get("SELECT * FROM Estoque WHERE id_fornecedor = ?", [id_fornecedor], (err, estoque) => {
            if (err) {
                console.error("Erro ao verificar estoque:", err.message);
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            }

            if (estoque) {
                return res.status(400).json({ mensagem: "Não é possível excluir. O fornecedor está associado ao estoque." });
            }

            db.get("SELECT * FROM Saida WHERE id_fornecedor = ?", [id_fornecedor], (err, saida) => {
                if (err) {
                    console.error("Erro ao verificar saída:", err.message);
                    return res.status(500).json({ mensagem: "Erro interno do servidor" });
                }

                if (saida) {
                    return res.status(400).json({ mensagem: "Não é possível excluir. O fornecedor está associado a uma saída." });
                }

                db.run("DELETE FROM Fornecedor WHERE id_fornecedor = ?", [id_fornecedor], function(err) {
                    if (err) {
                        console.error("Erro ao excluir o fornecedor:", err.message);
                        return res.status(500).json({ mensagem: "Erro interno do servidor" });
                    }
                    return res.status(200).json("O fornecedor foi excluído com sucesso.");
                });
            });
        });
    });
};


const detalharFornecedor = (req, res) => {
    const { id_fornecedor } = req.params;

    db.get("SELECT nm_fornecedor FROM Fornecedor WHERE id_fornecedor = ?", [id_fornecedor], (err, fornecedor) => {
        if (err) {
            console.error("Erro ao detalhar o fornecedor:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (!fornecedor) {
            return res.status(404).json({ mensagem: "Fornecedor não encontrado." });
        }
        return res.status(200).json(fornecedor);
    });
};

module.exports = {
    cadastrarFornecedor,
    listarFornecedores,
    editarFornecedor,
    excluirFornecedor,
    detalharFornecedor
};
