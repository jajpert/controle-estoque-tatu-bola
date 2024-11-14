const db = require("../db/db");

const cadastrarMtvSaida = (req, res) => {
    const { nm_mtv_saida  } = req.body;

    const campoObrigatorios = [
    { campo: nm_mtv_saida , nomeCampo: "nm_mtv_saida" }
    ];

    const campoVazio = campoObrigatorios
    .filter(({ campo }) => campo === undefined || campo === null || campo.trim() === "")
    .map(({ nomeCampo }) => nomeCampo);

    if (campoVazio.length > 0) {
    return res.status(400).json({ mensagem: `O campo nm_mtv_saida é obrigatório` });
    }

    db.get("SELECT * FROM Motivo_Saida WHERE nm_mtv_saida = ?", [nm_mtv_saida], (err, motivo_saida_existente) => {
    if (err) {
        console.error("Erro ao verificar motivo_saida_existente:", err.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }

    if (motivo_saida_existente) {
        return res.status(400).json("O motivo_saida já está cadastrada");
    }

    db.run("INSERT INTO Motivo_Saida (nm_mtv_saida) VALUES (?)", [nm_mtv_saida], function(err) {
        if (err) {
        console.error("Erro ao cadastrar o motivo_saida:", err.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        return res.status(201).json("O motivo_saida foi cadastrado com sucesso!");
    });
    });
};

const listarMtvSaida = (req, res) => {
    db.all("SELECT * FROM Motivo_Saida", [], (err, motivo_Saida) => {
        if (err) {
            console.error("Erro ao listar as motivo_saida:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (motivo_Saida.length === 0) {
            return res.status(404).json({ mensagem: "Nenhuma motivo_saida cadastrada" });
        }
        return res.status(200).json(motivo_Saida);
    });
};

const editarMtvSaida = (req, res) => {
    const { id_mtv_saida } = req.params;
    const { nm_mtv_saida } = req.body;

    db.get("SELECT * FROM Motivo_Saida WHERE id_mtv_saida = ?", [id_mtv_saida], (err, motivo_Saida) => {
        if (err) {
            console.error("Erro ao verificar motivo_saida:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (!motivo_Saida) {
            return res.status(404).json({ mensagem: "Motivo_Saida não encontrado" });
        }

        db.run("UPDATE Motivo_Saida SET nm_mtv_saida  = ? WHERE id_mtv_saida = ?", [nm_mtv_saida, id_mtv_saida], function(err) {
            if (err) {
                console.error("Erro ao atualizar o motivo_saida:", err.message);
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            }
            return res.status(204).send();
        });
    });
};

const excluirMtvSaida = (req, res) => {
    const { id_mtv_saida } = req.params;

    db.get("SELECT * FROM Motivo_Saida WHERE id_mtv_saida = ?", [id_mtv_saida], (err, motivo_saida) => {
        if (err) {
            console.error("Erro ao verificar motivo_saida:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }

        if (!motivo_saida) {
            return res.status(404).json({ mensagem: "Motivo_Saida não encontrada." });
        }

        db.get("SELECT * FROM Estoque WHERE id_mtv_saida = ?", [id_mtv_saida], (err, estoque) => {
            if (err) {
                console.error("Erro ao verificar estoque:", err.message);
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            }

            if (estoque) {
                return res.status(400).json({ mensagem: "Não é possível excluir. A motivo_Saida está associada ao estoque." });
            }

            db.get("SELECT * FROM Saida WHERE id_mtv_saida = ?", [id_mtv_saida], (err, saida) => {
                if (err) {
                    console.error("Erro ao verificar motivo_saida:", err.message);
                    return res.status(500).json({ mensagem: "Erro interno do servidor" });
                }

                if (saida) {
                    return res.status(400).json({ mensagem: "Não é possível excluir. O motivo_saida está associada a uma saida." });
                }

                db.run("DELETE FROM Motivo_Saida WHERE id_mtv_saida = ?", [id_mtv_saida], function(err) {
                    if (err) {
                        console.error("Erro ao excluir a motivo_Saida:", err.message);
                        return res.status(500).json({ mensagem: "Erro interno do servidor" });
                    }
                    return res.status(200).json("A motivo_Saida foi excluída com sucesso.");
                });
            });
        });
    });
};



const detalharMtvSaida = (req, res) => {
    const { id_mtv_saida } = req.params;

    db.get("SELECT nm_mtv_saida FROM Motivo_Saida WHERE id_mtv_saida = ?", [id_mtv_saida], (err, motivo_Saida) => {
        if (err) {
            console.error("Erro ao detalhar o motivo_Saida:", err.message);
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
        if (!motivo_Saida) {
            return res.status(404).json({ mensagem: "Motivo_Saida não encontrado." });
        }
        return res.status(200).json(motivo_Saida);
    });
};

module.exports = {
    cadastrarMtvSaida,
    listarMtvSaida,
    editarMtvSaida,
    excluirMtvSaida,
    detalharMtvSaida
};
