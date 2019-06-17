using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace ProAgil.Domain.Identity
{
    public class Papel : IdentityRole<int>
    {
        public List<UsuarioPapel> UsuarioPapel{get;set;}
    }
}