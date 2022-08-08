using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace doisrp_webAPI.Domains
{

    /// <summary>
    /// Classe que representa a entidade (tabela) de usuarios
    /// </summary>

    public partial class Usuario
    {
        public int IdUsuario { get; set; }
        public byte? IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Imagem { get; set; }

        [Required(ErrorMessage = "O campo e-mail é obrigatorio!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo senha é obrigatorio!")]
        [StringLength(80, MinimumLength = 8, ErrorMessage = "A senha deve ter de 8 a 80 caracteres!")]
        public string Senha { get; set; }
        public bool? Situacao { get; set; }

        public virtual Tipousuario IdTipoUsuarioNavigation { get; set; }
    }
}
