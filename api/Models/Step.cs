using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Step
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool Completed { get; set; }
        public TaskModel Task { get; set; }
        public ApplicationUser User { get; set; }
    }
}
