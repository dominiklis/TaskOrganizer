using api.DTOs.Notes;
using api.DTOs.Steps;
using api.DTOs.Tasks;
using api.DTOs.Users;
using api.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace api.Profiles
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TaskModel, GetTaskDTO>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(src => src.TaskTags.Select(t => t.Tag).ToList()))
                .ForMember(x => x.AuthorName, opt => opt.MapFrom(src => src.User.UserName));

            CreateMap<Tag, string>().ConvertUsing(x => x.Name);

            CreateMap<AddTaskDTO, TaskModel>()
                .BeforeMap((src, dest) => dest.Added = DateTime.Now)
                .ForMember(dest => dest.StartDate, opt =>
                    opt.MapFrom(src =>
                        DateTime.Parse(src.StartDate, CultureInfo.InvariantCulture, DateTimeStyles.None)))
                .ForMember(dest => dest.EndDate, opt =>
                    opt.MapFrom(src =>
                        src.EndDate == null ? 
                            (DateTime?)null : 
                            DateTime.Parse(src.EndDate, CultureInfo.InvariantCulture, DateTimeStyles.None)));

            CreateMap<UpdateTaskDTO, TaskModel>()
                 .ForMember(dest => dest.StartDate, opt =>
                     opt.MapFrom(src =>
                         DateTime.Parse(src.StartDate, CultureInfo.InvariantCulture, DateTimeStyles.None)))
                 .ForMember(dest => dest.EndDate, opt =>
                     opt.MapFrom(src =>
                         src.EndDate == null ?
                            (DateTime?)null :
                            DateTime.Parse(src.EndDate, CultureInfo.InvariantCulture, DateTimeStyles.None)))
                .ForMember(src => src.TaskTags, opt => opt.Ignore());

            CreateMap<Step, GetStepDTO>();

            CreateMap<ApplicationUser, GetUserDTO>();

            CreateMap<Note, GetNoteDTO>()
                .ForMember(x => x.AuthorName, opt => opt.MapFrom(src => src.User.UserName));
        }
    }
}
