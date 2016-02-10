using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }

        [ForeignKey("Employee")]
        public int? EmployeeId { get; set; }
        [ForeignKey("Child")]
        public int? ChildId { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
    }
}
