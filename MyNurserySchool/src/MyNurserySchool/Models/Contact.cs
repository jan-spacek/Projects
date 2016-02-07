using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
    }
}
