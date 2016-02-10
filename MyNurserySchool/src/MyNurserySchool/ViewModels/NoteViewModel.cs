using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.ViewModels
{
    public class NoteViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int? EmployeeId { get; set; }
        public int? ChildId { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
    }
}
