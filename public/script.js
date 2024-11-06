document.getElementById('generatePassword').addEventListener('click', generatePassword);
document.getElementById('savePassword').addEventListener('click', savePassword);

let generatedPassword = '';

// Função para gerar uma senha
function generatePassword() {
    fetch('/generate-password')
        .then(response => response.json())
        .then(data => {
            generatedPassword = data.password;
            document.getElementById('generatedPassword').textContent = generatedPassword;
        });
}

// Função para salvar a senha no banco de dados
function savePassword() {
    if (!generatedPassword) {
        alert('Por favor, gere uma senha primeiro!');
        return;
    }

    fetch('/save-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: generatedPassword })
    })
    .then(response => response.json())
    .then(data => {
        alert('Senha salva com sucesso!');
        loadSavedPasswords();
    });
}

// Função para carregar as senhas salvas
function loadSavedPasswords() {
    fetch('/get-saved-passwords')
        .then(response => response.json())
        .then(data => {
            const passwordList = document.getElementById('passwordList');
            passwordList.innerHTML = '';
            data.passwords.forEach(password => {
                const li = document.createElement('li');
                li.textContent = password;
                passwordList.appendChild(li);
            });
        });
}

// Carregar senhas salvas ao iniciar
loadSavedPasswords();
