using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Added { get; set; }
        public TaskModel Task { get; set; }
        public ApplicationUser User { get; set; }
        public bool Edited { get; set; } = false;
        public DateTime EditionDate { get; set; }
    }
}
