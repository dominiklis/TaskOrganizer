using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.UserTasks
{
    public class GetUserTaskDTO
    {
        public string UserName { get; set; }
        public string Id { get; set; }
        public int TaskId { get; set; }
    }
}
