using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Tasks
{
    public class UpdateTaskDTO
    {
        public bool EditDates { get; set; } = false;
        public bool EditTags { get; set; } = false;
        public string StartDate { get; set; }
        public bool HasStartTime { get; set; }
        public string EndDate { get; set; }
        public List<string> Tags { get; set; }
    }
}
