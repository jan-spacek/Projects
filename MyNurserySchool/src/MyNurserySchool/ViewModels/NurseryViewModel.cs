using MyNurserySchool.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyNurserySchool.ViewModels
{
    public class NurseryViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Employee Director { get; set; }
        public Address Address { get; set; }
        public virtual IEnumerable<ClassViewModel> Classes { get; set; }
        public virtual IEnumerable<EmployeeViewModel> Employees { get; set; }
        public string AllowedUsers { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
    }
}