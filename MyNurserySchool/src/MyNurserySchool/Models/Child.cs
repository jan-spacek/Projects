using MyNurserySchool.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.Models
{
    public class Child
    {
        #region Parameteres
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string SocialNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime LeaveDate { get; set; }
        public string Description { get; set; }
        public ICollection<Contact> Contacts { get; set; }
        public ICollection<Note> Notes { get; set; }
        public ChildState State { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
        #endregion
    }
}
