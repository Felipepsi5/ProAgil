using System.Linq;
using AutoMapper;
using ProAgil.API.Dto;
using ProAgil.Domain;
using ProAgil.Domain.Identity;

namespace ProAgil.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Evento, EventoDto>()
                .ForMember(dest=> dest.Palestrantes, opt => {
                    opt.MapFrom(src => src.PalestranteEventos.Select(x=>x.Palestrante).ToList());
                });                 
            CreateMap<Palestrante, PalestranteDto>()
            .ForMember(dest=> dest.Eventos, opt=> {
                opt.MapFrom(src => src.PalestranteEventos.Select(x=>x.Evento).ToList());
            }).ReverseMap();
            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();  
            CreateMap<Usuario, UserDto>().ReverseMap();  
            CreateMap<Usuario, UserLoginDto>().ReverseMap();            
        }
    }
}