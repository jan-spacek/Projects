using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.Models
{
    public class Class
    {
        #region Parameteres
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public Employee ClassTeacher { get; set; }
        public string Description { get; set; }
        public ICollection<Child> Children { get; set; }
        public ICollection<Note> Notes { get; set; }


        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
        #endregion
    }
}
