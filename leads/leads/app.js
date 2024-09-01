const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 8080;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: '1234', // Substitua pela sua senha do MySQL
    database: 'produtos_db', // Nome do banco de dados
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL com sucesso!');
});

// Servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para inserir produto
app.post('/adicionarProduto', (req, res) => {
    const { NomeProduto, Preco, Quantidade } = req.body;
    const query = 'INSERT INTO produto (NomeProduto, Preco, Quantidade) VALUES (?, ?, ?)';
    db.query(query, [NomeProduto, Preco, Quantidade], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao adicionar produto.' });
        } else {
            res.json({ message: 'Produto adicionado com sucesso!' });
        }
    });
});

// Rota para buscar produtos
app.get('/getProdutos', (req, res) => {
    const query = 'SELECT * FROM produto';
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    });
});

// Rota para atualizar produto
app.put('/update/:idProduto', (req, res) => {
    const { idProduto } = req.params;
    const { NomeProduto, Preco, Quantidade } = req.body;
    const query = 'UPDATE produto SET NomeProduto = ?, Preco = ?, Quantidade = ? WHERE idProduto = ?';
    db.query(query, [NomeProduto, Preco, Quantidade, idProduto], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Produto atualizado com sucesso!' });
    });
});

// Rota para deletar produto
app.delete('/delete/:idProduto', (req, res) => {
    const { idProduto } = req.params;
    const query = 'DELETE FROM produto WHERE idProduto = ?';
    db.query(query, [idProduto], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Produto deletado com sucesso!' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
