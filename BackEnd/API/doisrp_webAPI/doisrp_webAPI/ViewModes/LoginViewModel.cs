using System.ComponentModel.DataAnnotations;

namespace doisrp_webAPI.ViewModes
{
    /// <summary>
    /// Classe responsavel pelo modedlo de Login
    /// </summary>
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Informe o e-mail do usuario!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Informe a senha do usuario!")]
        public string Senha { get; set; }
    }
}