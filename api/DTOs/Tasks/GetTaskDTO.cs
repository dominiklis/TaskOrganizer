﻿using api.DTOs.Steps;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Tasks
{
    public class GetTaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; }
        public DateTime Added { get; set; }
        public DateTime StartDate { get; set; }
        public bool HasStartTime { get; set; }
        public DateTime? EndDate { get; set; }
        public List<GetStepDTO> Steps { get; set; }
    }
}
