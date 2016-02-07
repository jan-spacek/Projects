using MyNurserySchool.Models;
using System;

namespace MyNurserySchool.ViewModels
{
    public class EmployeeViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string WorkPhone { get; set; }
        public string PrivatePhone { get; set; }
        public Address Address { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; } = "admin";
        public DateTime Modified { get; set; } = DateTime.Now;
        public string ModifiedBy { get; set; } = "admin";
    }
}