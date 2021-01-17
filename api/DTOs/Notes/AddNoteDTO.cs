using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Notes
{
    public class AddNoteDTO
    {
        public string Text { get; set; }
        public int TaskId { get; set; }
    }
}
