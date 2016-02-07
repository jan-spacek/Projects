using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.Models
{
    public class Nursery
    {
        #region Parameteres
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Address Address { get; set; }
        public Employee Director { get; set; }
        public ICollection<Class> Classes { get; set; }
        public ICollection<Employee> Employees { get; set; }
        public string AllowedUsers { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
        #endregion
    }
}
