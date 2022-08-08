--Criei um banco de dados chamado "DOISRP"

CREATE DATABASE DOISRP
GO

--Define o banco de dados que sera utilizado
USE DOISRP
GO
--Tipo Usuario
CREATE TABLE TIPOUSUARIO(
	idTipoUsuario TINYINT PRIMARY KEY IDENTITY,
	nomeTipoUsuario VARCHAR(70) UNIQUE NOT NULL
);
GO

--Usuario
CREATE TABLE USUARIO(
	idUsuario INT PRIMARY KEY IDENTITY,
	idTipoUsuario TINYINT FOREIGN KEY REFERENCES TIPOUSUARIO(idTipoUsuario),
	nome VARCHAR(100) NOT NULL,
	imagem VARCHAR(255) NOT NULL ,
	email VARCHAR(256) NOT NULL,
	senha VARCHAR(80) NOT NULL CHECK( len(senha) >= 8),
	situacao BIT
);
GO