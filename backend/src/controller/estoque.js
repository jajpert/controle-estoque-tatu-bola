const db = require("../db/db");


const buscarEstoque = (req, res) => {
    const { page = 1, limit = 15 } = req.query;

    const offset = (page - 1) * limit;

    db.all(
        `SELECT
            p.id_produto,
            p.nm_produto,
            m.nm_marca
        FROM Produto p
        JOIN Entrada e ON p.id_produto = e.id_produto
        JOIN Marca m ON e.id_marca = m.id_marca
        LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, produtos) => {
            if (err) {
                console.error("Erro ao buscar os produtos:", err.message);
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            }

            if (!produtos || produtos.length === 0) {
                return res.status(404).json({ mensagem: "Nenhum produto encontrado" });
            }

            db.get(
                `SELECT COUNT(*) AS total FROM Produto`,
                (err, result) => {
                    if (err) {
                        console.error("Erro ao contar os produtos:", err.message);
                        return res.status(500).json({ mensagem: "Erro interno do servidor" });
                    }

                    const totalProdutos = result.total;
                    const totalPages = Math.ceil(totalProdutos / limit);
                    const currentPage = parseInt(page);


                    const responsePromises = produtos.map((produto) => {
                        return new Promise((resolve, reject) => {
                            db.all(
                                `SELECT
                                    e.qtd_produto,
                                    e.dt_validade,
                                    f.nm_fornecedor,
                                    e.dt_entrada
                                FROM Entrada e
                                JOIN Fornecedor f ON e.id_fornecedor = f.id_fornecedor
                                WHERE e.id_produto = ?
                                ORDER BY e.dt_entrada DESC`,
                                [produto.id_produto],
                                (err, entradas) => {
                                    if (err) {
                                        console.error("Erro ao buscar as entradas:", err.message);
                                        reject(err);
                                    }

                                    const totalQuantidade = entradas.reduce((acc, entrada) => acc + entrada.qtd_produto, 0);
                                    const stockStatus = totalQuantidade >= 100 ? 'ideal' : 'not_ideal';
                                    const ultimaEntrada = entradas.length > 0 ? entradas[0] : null;

                                    resolve({
                                        name: produto.nm_produto,
                                        brand: produto.nm_marca,
                                        stockStatus,
                                        lastRestock: ultimaEntrada ? new Date(ultimaEntrada.dt_entrada) : null,
                                        items: entradas.map((entrada) => ({
                                            amount: entrada.qtd_produto,
                                            supplier: entrada.nm_fornecedor,
                                            registrationDate: new Date(entrada.dt_entrada),
                                            expirationDate: new Date(entrada.dt_validade),
                                        })),
                                    });
                                }
                            );
                        });
                    });

                    // Espera todas as promessas de produtos serem resolvidas
                    Promise.all(responsePromises)
                        .then((products) => {
                            res.status(200).json({
                                currentPage,
                                totalPages,
                                products,
                            });
                        })
                        .catch((err) => {
                            res.status(500).json({ mensagem: "Erro ao processar os dados" });
                        });
                }
            );
        }
    );
};



module.exports = {
    buscarEstoque
};
