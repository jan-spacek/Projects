using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.Authentication
{
    public class StandardUser : IdentityUser
    {
        public Permission Permission { get; set; }
    }
}
