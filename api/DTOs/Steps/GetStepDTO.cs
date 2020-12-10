using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Steps
{
    public class GetStepDTO
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool Completed { get; set; }
    }
}
