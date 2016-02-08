using MyNurserySchool.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.ViewModels
{
    public class ClassViewModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 1)]
        public string Name { get; set; }
        public int Capacity { get; set; }
        public Employee ClassTeacher { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Child> Children { get; set; }
        public int? NurseryId { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
    }
}
