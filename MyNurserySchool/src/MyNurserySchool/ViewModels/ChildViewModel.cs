using MyNurserySchool.Enums;
using MyNurserySchool.Models;
using System;
using System.Collections.Generic;

namespace MyNurserySchool.ViewModels
{
    public class ChildViewModel
    {
        public int Id { get; set; }
        public int? Number { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string SocialNumber { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? LeaveDate { get; set; }
        public string Description { get; set; }
        public string Contacts { get; set; }
        public Address Address { get; set; }
        public ICollection<Note> Notes { get; set; }
        public AttendanceState Attendance { get; set; }
        public int? NurseryId { get; set; }
        public int? ClassId { get; set; }
        public string ClassName { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
    }
}
