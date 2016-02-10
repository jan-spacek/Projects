using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using MyNurserySchool.Models;
using MyNurserySchool.Authentication;

namespace MyNurserySchool.Data
{
    public class NurseryDbContext : IdentityDbContext<StandardUser>
    {
        public DbSet<Nursery> Nurseries { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Child> Children { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Note> Notes { get; set; }

        public NurseryDbContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connString = Startup.Configuration["Data:NurseriesContextConnection"];

            optionsBuilder.UseSqlServer(connString); 

            base.OnConfiguring(optionsBuilder);
        }
    }
}
