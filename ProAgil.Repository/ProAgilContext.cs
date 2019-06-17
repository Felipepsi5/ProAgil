using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain.Identity;
using ProAgil.Domain;
using Microsoft.AspNetCore.Identity;

namespace ProAgil.Repository
{
    public class ProAgilContext : IdentityDbContext<Usuario, Papel, int,
                                                          IdentityUserClaim<int>, UsuarioPapel, IdentityUserLogin<int>,
                                                          IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public ProAgilContext(DbContextOptions<ProAgilContext>options): base (options){}
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestranteEventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<RedeSocial> RedeSociais{get;set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
          base.OnModelCreating(modelBuilder);

          modelBuilder.Entity<UsuarioPapel>(userRole=>
             {
                 userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                 userRole.HasOne(ur=> ur.Papel)
                                .WithMany(r=> r.UsuarioPapel)
                                .HasForeignKey(ur=> ur.RoleId)
                                .IsRequired();               

                 userRole.HasOne(ur=> ur.Usuario)
                                .WithMany(r=> r.UsuarioPapel)
                                .HasForeignKey(ur=> ur.UserId)
                                .IsRequired();
             }
          );


           modelBuilder.Entity<PalestranteEvento>()
                       .HasKey(PE => new {PE.EventoId, PE.PalestranteId});
        }
    }
}