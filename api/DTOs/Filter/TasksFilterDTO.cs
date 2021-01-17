using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Filter
{
    public class TasksFilterDTO
    {
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string SortOrder { get; set; }
        public string Completed { get; set; }
        public string Search { get; set; }
        public string Shared { get; set; }

        public enum SharedFilter { SharedBy = 0, SharedTo = 1 }
    }
}
