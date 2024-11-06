# Imagem base do Node.js
FROM node:16

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de configuração para o container
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta 3000 para acessar a aplicação
EXPOSE 3000

# Rodar o aplicativo
CMD ["node", "server.js"]
