using doisrp_webAPI.Domains;
using doisrp_webAPI.Interfaces;
using doisrp_webAPI.Repositories;
using doisrp_webAPI.Utils;
using doisrp_webAPI.ViewModes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace doisrp_webAPI.Controllers
{
    /// <summary>
    /// Controller responsavel pelos endpoints (URLs) referentes aos usuarios
    /// </summary>

    //Define que o tipo de resposta da API sera no formato JSON
    [Produces("application/json")]

    //Define que a rota de uma requisicao sera no formato dominio/api/nomeController
    [Route("api/[controller]")]

    // Define que é um controlador de API
    [ApiController]


    public class UsuariosController : ControllerBase
    {
        /// <summary>
        /// Objeto _usuarioRepository que ira receber todos os metodos definidos na interface IUsuarioRepository
        /// </summary>
        private IUsuarioRepository _usuarioRepository { get; set; }


        /// <summary>
        /// Instancia o objeto _usuarioRepository para que haja a referencia aos metodos no repositorio
        /// </summary>
        public UsuariosController()
        {
            _usuarioRepository = new UsuarioRepository();
        }


        /// <summary>
        /// Lista todos os usuarios
        /// </summary>
        /// <returns>Uma lista de usuarios e um status code 200</returns>

        [Authorize(Roles = "2,3")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                // Retorna a resposta da requisicao fazendo a chamada para o metodo
                return Ok(_usuarioRepository.Listar());
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }

        /// <summary>
        /// Lista os dados do usuario logado
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "1,2,3")]
        [HttpGet("BuscarUsuario")]
        public IActionResult BuscarUsuarioLogado()
        {
            try
            {
                //Recebe o ID do usuário logado
                int id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(u => u.Type == JwtRegisteredClaimNames.Jti).Value);
                //Caso o ID seja maior que 0
                if (id > 0)
                {
                    //Busca o usuário pelo ID
                    Usuario usuario = _usuarioRepository.BuscarPorId(id);
                    //Caso não haja um usuário com o mesmo ID
                    if (usuario == null)
                        //Retorna NotFound
                        return NotFound(new
                        {
                            Mensagem = "O ID não corresponde a nenhum funcionário"
                        });
                    //Caso haja, retorna o usuário
                    return Ok(usuario);
                }
                return BadRequest(new
                {
                    Mensagem = "Id informado é inválido"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
                throw;
            }

        }



        /// <summary>
        /// Busca um usuario atraves do ID
        /// </summary>
        /// <param name="id">ID do usuario que sera buscado</param>
        /// <returns>Um usuario buscado e um status code 200 - Ok</returns>

        [Authorize(Roles = "1,2,3")]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_usuarioRepository.BuscarPorId(id));
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }




        /// <summary>
        /// Deleta um usuario existente
        /// </summary>
        /// <param name="id">ID do usuario que sera deletado</param>
        /// <returns>Um status code 204 - No Content</returns>
        [Authorize(Roles = "3")]
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            try
            {
                //Faz a chamada para o metodo
                _usuarioRepository.Deletar(id);

                // Retorna um status code
                return StatusCode(204);
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }


        /// <summary>
        /// Cadastra um novo usuario
        /// </summary>
        /// <param name="NovoUsuario"></param>
        /// <param name="FotoUsuario"></param>
        /// <returns>Retorna os dados do novo usuario</returns>
        //[Authorize(Roles = "2,3")]
        [HttpPost("Cadastrar")]
        public IActionResult Cadastrar([FromForm] UsuarioViewModelCadastro NovoUsuario, IFormFile FotoUsuario)
        {
            try
            {
                if (NovoUsuario == null)
                    return BadRequest("O Objeto não pode estar vazio!");

                if (FotoUsuario == null)
                {
                    NovoUsuario.Imagem = "imagem-padrao.png";
                }
                else
                {
                    #region Upload da Imagem com extensões permitidas apenas
                    string uploadResultado = Upload.UploadFile(FotoUsuario).ToString();

                    if (uploadResultado == "")
                    {
                        return BadRequest("Arquivo não encontrado !");
                    }
                    if (uploadResultado == "Extensão não permitida")
                    {
                        return BadRequest("Extensão do arquivo não permitida");
                    }

                    NovoUsuario.Imagem = uploadResultado;
                    #endregion
                }


                _usuarioRepository.Cadastrar(NovoUsuario);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }


        /// <summary>
        /// Atualiza todos os dados de qualquer usuario
        /// </summary>
        /// <param name="id"></param>
        /// <param name="UsuarioAtualizado"></param>
        /// <param name="FotoUsuario"></param>
        /// <returns></returns>
        [Authorize(Roles = "2,3")]
        [HttpPut("Atualizar/Adm/{id}")]
        public IActionResult AtualizarUsuarioPrivilegiado(int id, [FromForm] UsuarioAtualizarAdm UsuarioAtualizado, IFormFile FotoUsuario)
        {
            try
            {
                if (id == 0)
                    return BadRequest("Não há nenhum usuário com Id 0");

                else if (UsuarioAtualizado == null)
                    return BadRequest("O Objeto não pode estar vazio!");

                if (FotoUsuario != null)
                {

                    #region Upload da Imagem com extensões permitidas apenas
                    var usuarioEncontrado = _usuarioRepository.BuscarPorId(id);

                    string uploadResultado = Upload.AtualizarArquivo(usuarioEncontrado.Imagem, FotoUsuario).ToString();

                    if (uploadResultado == "")
                    {
                        return BadRequest("Arquivo não encontrado !");
                    }
                    if (uploadResultado == "Extensão não permitida")
                    {
                        return BadRequest("Extensão do arquivo não permitida");
                    }

                    UsuarioAtualizado.Imagem = uploadResultado;
                    #endregion
                }
                return Ok(_usuarioRepository.AtualizarAdm(id, UsuarioAtualizado));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }





        /// <summary>
        /// Atualiza um usuario existente
        /// </summary>
        /// <param name="id"></param>
        /// <param name="UsuarioAtualizado"></param>
        /// <param name="FotoUsuario"></param>
        /// <returns>Retorna uma lista de dados atualizados</returns>

        [Authorize(Roles = "1,2,3")]
        [HttpPut("Atualizar/PerfilGeral/{id}")]
        public IActionResult AtualizarUsuarioGeral(int id, [FromForm] UsuarioGeralViewModelAtualizar UsuarioAtualizado, IFormFile FotoUsuario)
        {
            try
            {

                if (id == 0)
                    return BadRequest("Não há nenhum usuário com Id 0");

                else if (UsuarioAtualizado == null)
                    return BadRequest("O Objeto não pode estar vazio!");

                if (FotoUsuario != null)
                {

                    #region Upload da Imagem com extensões permitidas apenas
                    var usuarioEncontrado = _usuarioRepository.BuscarPorId(id);

                    string uploadResultado = Upload.AtualizarArquivo(usuarioEncontrado.Imagem, FotoUsuario).ToString();

                    if (uploadResultado == "")
                    {
                        return BadRequest("Arquivo não encontrado !");
                    }
                    if (uploadResultado == "Extensão não permitida")
                    {
                        return BadRequest("Extensão do arquivo não permitida");
                    }

                    UsuarioAtualizado.Imagem = uploadResultado;
                    #endregion
                }
                return Ok(_usuarioRepository.AtualizarGeral(id, UsuarioAtualizado));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }


    }



}
