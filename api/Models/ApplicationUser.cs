using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<TaskModel> Tasks { get; set; }
        public List<Step> Steps { get; set; }
    }
}
