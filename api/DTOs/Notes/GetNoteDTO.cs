using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Notes
{
    public class GetNoteDTO
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Added { get; set; }
        public int TaskId { get; set; }
        public string AuthorName { get; set; }
    }
}
