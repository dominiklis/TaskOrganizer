using api.DTOs.Tasks;
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
            CreateMap<TaskModel, GetTaskDTO>();

            CreateMap<AddTaskDTO, TaskModel>()
                .BeforeMap((src, dest) => dest.Added = DateTime.Now)
                .ForMember(dest => dest.StartDate, opt =>
                    opt.MapFrom(src =>
                        DateTime.Parse(src.StartDate, CultureInfo.InvariantCulture, DateTimeStyles.None)))
                .ForMember(dest => dest.EndDate, opt =>
                    opt.MapFrom(src =>
                        src.EndDate == null ? (DateTime?)null : DateTime.Parse(src.EndDate, CultureInfo.InvariantCulture, DateTimeStyles.None)))
                //.ForMember(x => x.EndDate, opt => opt.Ignore())
                ;
        }
    }
}
