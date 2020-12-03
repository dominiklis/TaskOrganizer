using api.DTOs.Tasks;
using api.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Profiles
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TaskModel, GetTaskDTO>();
            CreateMap<AddTaskDTO, TaskModel>();
        }
    }
}
