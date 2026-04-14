using AutoMapper;
using JobBoard.Dtos;
using JobBoard.Models;

namespace JobBoard.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<Job, JobResponseDto>()
                .ForMember(dest => dest.ClientName,
                    opt => opt.MapFrom(src => src.Client.Name));

            CreateMap<Application, ApplicationResponseDto>()
                .ForMember(dest => dest.JobTitle,
                    opt => opt.MapFrom(src => src.Job.Title))
                .ForMember(dest => dest.FreelancerName,
                    opt => opt.MapFrom(src => src.Freelancer.Name));

            CreateMap<CreateJobDto, Job>()
                .ForMember(dest => dest.Status,
                    opt => opt.MapFrom(src => "Open"));
        }
    }
}
