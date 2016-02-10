using MyNurserySchool.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.Models
{
    public class Employee
    {
        #region Parameteres
        public int Id { get; set; }
        public string FullName { get; set; }
        public string JobTitle { get; set; }
        public string Employment { get; set; }
        public string Description { get; set; }
        public DateTime? BirthDate { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? LeaveDate { get; set; }
        public Address Address { get; set; }
        public string Email { get; set; }
        public string PrivatePhone { get; set; }
        public string WorkPhone { get; set; }
        public ICollection<Note> Notes { get; set; }
        public AttendanceState Attendance { get; set; }

        [ForeignKey("Nursery")]
        public int? NurseryId { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
        #endregion
    }
}
