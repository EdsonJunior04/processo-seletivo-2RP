using doisrp_webAPI.Domains;
using doisrp_webAPI.ViewModes;
using System.Collections.Generic;

namespace doisrp_webAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        /// <summary>
        ///  Valida o usuario 
        /// </summary>
        /// <param name="email">E-mail do usuario</param>
        /// <param name="senha">Senha do usuario</param>
        /// <returns>Um objeto do tipo Usuario que foi buscado</returns>
        Usuario Login(string email, string senha);


        /// <summary>
        /// Lista todos os usuarios
        /// </summary>
        /// <returns>Uma lista de usuarios</returns>
        List<Usuario> Listar();

        /// <summary>
        /// Cadastra um novo usuario
        /// </summary>
        /// <param name="novoUsuario">Objeto novoUsuario que sera cadastrado</param>
        void Cadastrar(UsuarioViewModelCadastro novoUsuario);


        /// <summary>
        /// Atualiza email e senha do usuario
        /// </summary>
        /// <param name="id">ID do usuario que sera atualizado</param>
        /// <param name="usuarioAtualizado">Objeto com as novas informacoes</param>
        Usuario AtualizarGeral(int id, UsuarioGeralViewModelAtualizar usuarioAtualizado);


        /// <summary>
        /// Atualiza todos os dados de qualquer usuario
        /// </summary>
        /// <param name="id"></param>
        /// <param name="usuarioAtualizado"></param>
        /// <returns></returns>
        Usuario AtualizarAdm(int id, UsuarioAtualizarAdm usuarioAtualizado);



        /// <summary>
        /// Deletar um usuario existente
        /// </summary>
        /// <param name="id">ID do usuario que sera deletado</param>
        void Deletar(int id);


        /// <summary>
        /// Busca um usuario atraves do ID
        /// </summary>
        /// <param name="Id">ID do usuario que sera buscado</param>
        /// <returns>Um usuario buscado</returns>
        Usuario BuscarPorId(int Id);
    }
}
