const db = require("../db/db");

const cadastrarMarca = (req, res) => {
    const { nm_marca  } = req.body;

    const campoObrigatorios = [
    { campo: nm_marca , nomeCampo: "nm_marca" }
    ];

    const campoVazio = campoObrigatorios
    .filter(({ campo }) => campo === undefined || campo === null || campo.trim() === "")
    .map(({ nomeCampo }) => nomeCampo);

    if (campoVazio.length > 0) {
    return res.status(400).json({ mensagem: `O campo nm_marca é obrigatório` });
    }

    db.get("SELECT * FROM Marca WHERE nm_marca  = ?", [nm_marca], (err, marcaExistente) => {
    if (err) {
        console.error("Erro ao verificar marca existente:", err.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }

    if (marcaExistente) {
        return res.status(400).json("A marca já está cadastrada");
    }

    db.run("INSERT INTO Marca (nm_marca) VALUES (?)", [nm_marca], function(err) {
        if (err) {
        console.error("Erro ao cadastrar a marca:", err.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        return res.status(201).json("O marca foi cadastrado com sucesso!");
    });
    });
};

const listarMarcas = (req, res) => {
    db.all("SELECT * FROM Marca", [], (err, marca) => {
        if (err) {
            console.error("Erro ao listar as marca:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (marca.length === 0) {
            return res.status(404).json({ mensagem: "Nenhuma marca cadastrada" });
        }
        return res.status(200).json(marca);
    });
};

const editarMarca = (req, res) => {
    const { id_marca } = req.params;
    const { nm_marca } = req.body;

    db.get("SELECT * FROM Marca WHERE id_marca = ?", [id_marca], (err, marca) => {
        if (err) {
            console.error("Erro ao verificar marca:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (!marca) {
            return res.status(404).json({ mensagem: "Marca não encontrado" });
        }

        db.run("UPDATE Marca SET nm_marca  = ? WHERE id_marca = ?", [nm_marca, id_marca], function(err) {
            if (err) {
                console.error("Erro ao atualizar o marca:", err.message);
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            }
            return res.status(204).send();
        });
    });
};

const excluirMarca = (req, res) => {
    const { id_marca } = req.params;

    db.get("SELECT * FROM Marca WHERE id_marca = ?", [id_marca], (err, marca) => {
        if (err) {
            console.error("Erro ao verificar marca:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }

        if (!marca) {
            return res.status(404).json({ mensagem: "Marca não encontrada." });
        }

        db.get("SELECT * FROM Estoque WHERE id_marca = ?", [id_marca], (err, estoque) => {
            if (err) {
                console.error("Erro ao verificar estoque:", err.message);
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            }

            if (estoque) {
                return res.status(400).json({ mensagem: "Não é possível excluir. A marca está associada ao estoque." });
            }

            db.get("SELECT * FROM Saida WHERE id_marca = ?", [id_marca], (err, saida) => {
                if (err) {
                    console.error("Erro ao verificar saída:", err.message);
                    return res.status(500).json({ mensagem: "Erro interno do servidor" });
                }

                if (saida) {
                    return res.status(400).json({ mensagem: "Não é possível excluir. A marca está associada a uma saída." });
                }

                db.run("DELETE FROM Marca WHERE id_marca = ?", [id_marca], function(err) {
                    if (err) {
                        console.error("Erro ao excluir a marca:", err.message);
                        return res.status(500).json({ mensagem: "Erro interno do servidor" });
                    }
                    return res.status(200).json("A marca foi excluída com sucesso.");
                });
            });
        });
    });
};



const detalharMarca = (req, res) => {
    const { id_marca } = req.params;

    db.get("SELECT nm_marca FROM Marca WHERE id_marca = ?", [id_marca], (err, marca) => {
        if (err) {
            console.error("Erro ao detalhar o marca:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (!marca) {
            return res.status(404).json({ mensagem: "Marca não encontrado." });
        }
        return res.status(200).json(marca);
    });
};

module.exports = {
    cadastrarMarca,
    listarMarcas,
    editarMarca,
    excluirMarca,
    detalharMarca
};
