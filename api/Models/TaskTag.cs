using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class TaskTag
    {
        public int TaskId { get; set; }
        public TaskModel Task { get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
