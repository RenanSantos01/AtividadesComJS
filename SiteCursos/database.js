const mysql = require('mysql2');

// Conectar ao MySQL (substitua com suas credenciais)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'techno_wave'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

module.exports = connection;
