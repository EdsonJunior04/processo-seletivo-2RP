--Define o banco de dados que sera utilizado
USE DOISRP
GO

--TIPOUSUARIO
INSERT INTO TIPOUSUARIO(nomeTipoUsuario)
VALUES('geral'), ('admin'), ('root')
GO

--USUARIO
INSERT INTO USUARIO(idTipoUsuario, nome, imagem, email, senha, situacao)
VALUES 
('3', 'Root', 'root.png','root@gmail.com','root1234', 0)
GO

SELECT * FROM USUARIO