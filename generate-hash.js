const bcrypt = require('bcryptjs');

// Gera o hash para a senha "minhasenha"
bcrypt.hash('minhasenha', 10, (err, hash) => {
  if (err) throw err;
  console.log(hash);  // O hash gerado será mostrado aqui
});
