using doisrp_webAPI.Context;
using doisrp_webAPI.Domains;
using doisrp_webAPI.Interfaces;
using doisrp_webAPI.Utils;
using doisrp_webAPI.ViewModes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace doisrp_webAPI.Repositories
{

    public class UsuarioRepository : IUsuarioRepository
    {

        DoisRpContext ctx = new DoisRpContext();



        /// <summary>
        /// Atualiza um usuario existente
        /// </summary>
        /// <param name="id">ID do usuario que sera atualizado</param>
        /// <param name="usuarioAtualizado">Objeto com as novas informacoes</param>
        public Usuario AtualizarGeral(int id, UsuarioGeralViewModelAtualizar usuarioAtualizado)
        {
            var usuarioEncontrado = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == id);

            if (usuarioEncontrado != null)
            {
                if (usuarioAtualizado.Senha != null)
                    usuarioEncontrado.Senha = usuarioAtualizado.Senha;

                if (usuarioAtualizado.Email != null)
                    usuarioEncontrado.Email = usuarioAtualizado.Email;

                if (usuarioAtualizado.Nome != null)
                    usuarioEncontrado.Nome = usuarioAtualizado.Nome;

                if (usuarioAtualizado.Imagem != null)
                    usuarioEncontrado.Imagem = usuarioAtualizado.Imagem;

                ctx.Usuarios.Update(usuarioEncontrado);
                ctx.SaveChanges();

                return usuarioEncontrado;
            }

            return null;


        }


        public Usuario AtualizarAdm(int id, UsuarioAtualizarAdm usuarioAtualizado)
        {
            var usuarioEncontrado = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == id);

            if (usuarioEncontrado != null)
            {

                if (usuarioAtualizado.Nome != null)
                    usuarioEncontrado.Nome = usuarioAtualizado.Nome;

                if (usuarioAtualizado.Imagem != null)
                    usuarioEncontrado.Imagem = usuarioAtualizado.Imagem;

                if (usuarioAtualizado.Senha != null)
                    usuarioEncontrado.Senha = usuarioAtualizado.Senha;

                if (usuarioAtualizado.Email != null)
                    usuarioEncontrado.Email = usuarioAtualizado.Email;

                if (usuarioEncontrado.Situacao != usuarioAtualizado.Situacao)
                    usuarioEncontrado.Situacao = usuarioAtualizado.Situacao;

                if (usuarioAtualizado.IdTipoUsuario != 0)
                    usuarioEncontrado.IdTipoUsuario = usuarioAtualizado.IdTipoUsuario;

                ctx.Usuarios.Update(usuarioEncontrado);
                ctx.SaveChanges();

                return usuarioEncontrado;
            }

            return null;
        }



        /// <summary>
        /// Busca um usuario atraves do ID
        /// </summary>
        /// <param name="Id">ID do usuario que sera buscado</param>
        /// <returns>Um usuario buscado</returns>
        public Usuario BuscarPorId(int Id)
        {
            // Retorna o primeiro usuario encontrado para o ID informado, sem exibir sua senha
            return ctx.Usuarios
                .Select(u => new Usuario()
                {
                    IdUsuario = u.IdUsuario,
                    Nome = u.Nome,
                    Email = u.Email,
                    Situacao = u.Situacao,
                    Imagem = u.Imagem,
                    IdTipoUsuario = u.IdTipoUsuario,
                    IdTipoUsuarioNavigation = new Tipousuario()
                    {
                        IdTipoUsuario = u.IdTipoUsuarioNavigation.IdTipoUsuario,
                        NomeTipoUsuario = u.IdTipoUsuarioNavigation.NomeTipoUsuario
                    }
                })
                .FirstOrDefault(u => u.IdUsuario == Id);
        }

        /// <summary>
        /// Cadastra um novo usuario
        /// </summary>
        /// <param name="novoUsuario">Objeto novoUsuario que sera cadastrado</param>
        public void Cadastrar(UsuarioViewModelCadastro novoUsuario)
        {
            Usuario usuario = new()
            {
                Nome = novoUsuario.Nome,
                Email = novoUsuario.Email,
                Imagem = novoUsuario.Imagem,
                IdTipoUsuario = novoUsuario.IdTipoUsuario,
                Situacao = novoUsuario.Situacao,
                Senha = novoUsuario.Senha

            };
            ctx.Usuarios.Add(usuario);
            ctx.SaveChanges();
        }

        /// <summary>
        /// Deleta um usuario existente
        /// </summary>
        /// <param name="id">ID do usaurio que sera deletado</param>
        public void Deletar(int id)
        {
            // Remove o tipo do usuario que foi buscado
            ctx.Usuarios.Remove(BuscarPorId(id));

            //Salva as alteracoes
            ctx.SaveChanges();
        }

        /// <summary>
        /// Lista todos os usuarios
        /// </summary>
        /// <returns>Uma lista de usuarios</returns>
        public List<Usuario> Listar()
        {
            //Retorna uma lista com todas as informacoes dos tipos de usuarios, exceto as senhas
            return ctx.Usuarios
               .Select(u => new Usuario()
               {
                   IdUsuario = u.IdUsuario,
                   Nome = u.Nome,
                   Email = u.Email,
                   Situacao = u.Situacao,
                   Imagem = u.Imagem,
                   IdTipoUsuario = u.IdTipoUsuario,
                   IdTipoUsuarioNavigation = new Tipousuario()
                   {
                       IdTipoUsuario = u.IdTipoUsuarioNavigation.IdTipoUsuario,
                       NomeTipoUsuario = u.IdTipoUsuarioNavigation.NomeTipoUsuario
                   }
               })
               .ToList();
        }


        public Usuario Login(string email, string senha)
        {
            var usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuario != null)
            {
                if (usuario.Senha.Length != 32 && usuario.Senha.Substring(0, 1) != "$")
                {
                    usuario.Senha = Criptografia.GerarHash(usuario.Senha);
                    ctx.SaveChanges();
                    return usuario;
                }
                bool confere = Criptografia.Comparar(senha, usuario.Senha);
                if (confere)
                {
                    return usuario;
                }
            }
            return null;
        }

        public bool ValidarSenha(string senha)
        {
            const int TAMANHO = 60;

            if (string.IsNullOrEmpty(senha) || senha.Length > TAMANHO)
            {
                return false;
            }
            else if (Regex.IsMatch(senha, @"\$"))
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
