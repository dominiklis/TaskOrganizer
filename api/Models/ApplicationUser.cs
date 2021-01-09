using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<TaskModel> Tasks { get; set; }
        public ICollection<Step> Steps { get; set; }
        public ICollection<UserTask> UserTasks { get; set; }
    }
}
