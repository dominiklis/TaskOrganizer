using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Tasks
{
    public class UpdateTaskDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; } = false;
        public string StartDate { get; set; }
        public bool HasStartTime { get; set; }
        public string EndDate { get; set; }
    }
}
