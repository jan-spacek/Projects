using MyNurserySchool.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.Models
{
    public class Child
    {
        #region Parameteres
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
        [ForeignKey("Class")]
        public int? ClassId { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
        #endregion
    }
}
