using Microsoft.AspNetCore.Identity;

namespace ProAgil.Domain.Identity
{
    public class UsuarioPapel : IdentityUserRole<int>
    {
        public Usuario Usuario { get; set; }
        public Papel Papel { get; set; }
    }
}