-- Criação do banco de dados e da tabela
CREATE DATABASE IF NOT EXISTS password_manager;

USE password_manager;

CREATE TABLE IF NOT EXISTS passwords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);
