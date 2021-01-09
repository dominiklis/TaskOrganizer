using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class UserTask
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int TaskId { get; set; }
        public TaskModel Task { get; set; }
    }
}
