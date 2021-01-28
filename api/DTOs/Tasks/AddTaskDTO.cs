using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Tasks
{
    public class AddTaskDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public string StartDate { get; set; }
        public bool HasStartTime { get; set; }
        public string EndDate { get; set; }
        public List<string> Tags { get; set; }
    }
}
