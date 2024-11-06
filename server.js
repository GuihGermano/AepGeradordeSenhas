const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const crypto = require('crypto');
const app = express();
const port = 3000;

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'db',  // Nome do serviço Docker para o MySQL
  user: 'root',  // Usuário root
  password: 'rootpassword',  // Senha configurada no Docker Compose
  database: 'password_manager'  // Nome do banco de dados
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados!');
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve os arquivos estáticos do frontend

// Função para gerar uma senha segura
function generateSecurePassword() {
  return crypto.randomBytes(16).toString('hex'); // Gera uma senha de 32 caracteres
}

// Rota para gerar a senha
app.get('/generate-password', (req, res) => {
  const password = generateSecurePassword();
  res.json({ password });
});

// Rota para salvar a senha no banco de dados
app.post('/save-password', (req, res) => {
  const { password } = req.body;
  const query = 'INSERT INTO passwords (password) VALUES (?)';
  db.query(query, [password], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Senha salva com sucesso!' });
  });
});

// Rota para obter as senhas salvas
app.get('/get-saved-passwords', (req, res) => {
  const query = 'SELECT password FROM passwords';
  db.query(query, (err, results) => {
    if (err) throw err;
    const passwords = results.map(row => row.password);
    res.json({ passwords });
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
