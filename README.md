# Processo-Seletivo-2RP 🔵
Este repositório foi desenvolvido com o intuito de apresentar todo o código fonte utilizado para solucionar a demanda que foi entregue. 

## Como utilizar aplicação ? 
> Tenha o NodeJS e o framework dotnet em sua máquina assim como o Git, caso não os tenha:
 - https://nodejs.org/en/
 - https://dotnet.microsoft.com/en-us/
 - https://git-scm.com/
 
 > Entre na pasta "Back-end > API > doisrp_webAPI > doisrp_webAPI" e insira o comando no cmd:
 - dotnet run (Para iniciar a API)
 
 > Entre na pasta "Front-end > dois-rp " e insira os comandos:
 - npm i (instalar a node_modules)
 - npm start (iniciar a aplicação web)
 

## Demanda: 
- Criar um sistema que possibilite o cadastro e login de usuários

## Funções :
- [x] Cadastrar um novo usuário;
- [x] Listar informações de um usuário;
- [x] Alterar o nome e o tipo de um usuário;
- [x] Excluir um usuário;
- [x] Alterar o status de um usuário (ativo ou inativo)
- [x] Tipos de usuário.

##
Regras de negócio 
- [x] A tabela usuários deve conter os campos nome, senha, tipo, email e
status;
- [x] A tabela de tipos deve ter o tipo do usuário (geral, admin, root)
- [x] Um usuário pode ter apenas um único tipo;
- [x] Apenas usuários do tipo root e admin podem cadastrar novos usuários;
- [x] Apenas usuários do tipo root e admin podem alterar qualquer informa-
  ção do usuário (inclusive status);
- [x] Apenas usuários root podem excluir usuários;
- [x] Usuários do tipo geral só têm acesso a funcionalidade de listar infor-
mações de seu próprio usuário, bem como alterar suas próprias infor-
mações;
- [x] O login deve ser feito com email e senha;


## Tecnologias Utilizadas :
<p float="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain-wordmark.svg" width=110 height=110/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" width=110 height=110 />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"  width=110 height=110 />    
</p>


- SQL Server: Banco de dados utilizado para armazenar e gerenciar os dados.
- .NET: A API REST foi feita com C# utilizando o ambiente .Net como framework.
- React: Biblioteca de JavaScript utilizada para densenvolver o front-end.


## Ferramentas secundárias  :
<p float="left">
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" width=110 height=90/>
</p>

- Figma: Utilizado na criacão dos layouts de baixa e de alta da aplicação como um todo.
