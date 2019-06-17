using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ProAgil.Domain.Identity
{
    public class Usuario : IdentityUser<int>
    {
        [Column(TypeName="nvarchar(150)")]
        public string FullName { get; set; }
        public List<UsuarioPapel> UsuarioPapel { get; set; }
    }
}