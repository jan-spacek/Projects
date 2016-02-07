using Microsoft.AspNet.Identity;
using MyNurserySchool.Authentication;
using MyNurserySchool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.Data
{
    public class NurseryContextSeedData
    {
        private NurseryContext _context;
        private UserManager<StandardUser> _userManager;

        public NurseryContextSeedData(NurseryContext context, UserManager<StandardUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task EnsureSeedDataAsync()
        {
            if (await _userManager.FindByEmailAsync("jan.spacek@gmail.com") == null)
            {
                var newUser = new StandardUser()
                {
                    UserName = "admin",
                    Email = "jan.spacek@gmail.com",
                    Permission = Permission.Full
                };

                await _userManager.CreateAsync(newUser, "P@ssw0rd");
            }

            if (await _userManager.FindByEmailAsync("lucia.spackova@gmail.com") == null)
            {
                var newUser = new StandardUser()
                {
                    UserName = "lucia.spackova",
                    Email = "lucia.spackova@gmail.com",
                    Permission = Permission.Edit
                };

                await _userManager.CreateAsync(newUser, "P@ssw0rd");
            }

            if (!_context.Nurseries.Any())
            {
                var kidsParadiseRuz = new Nursery()
                {
                    Name = "Kids Paradise - Ružinov",
                    Created = DateTime.UtcNow,
                    CreatedBy = "admin",
                    Address = new Address()
                    {
                        Street = "Martinčekova",
                        Number = "13",
                        City = "Bratislava",
                        Zip = 82101
                    },
                    Employees = new List<Employee>() {
                        new Employee()
                        {
                            FullName = "Mgr. Lucia Špačková",
                            DateOfBirth = new DateTime(1990, 8, 1),
                            StartDate = new DateTime(2014, 9, 1),
                            JobTitle = "riaditeľka",
                            Employment = "plný úväzok",
                            Created = DateTime.Now,
                            CreatedBy = "admin",
                            Email = "lucia.spackova@kidsparadise.sk"
                        }
                    },
                    Classes = new List<Class>()
                    {
                        new Class()
                        {
                            Name = "Žabky",
                            Created = DateTime.Now,
                            CreatedBy = "admin",
                            Capacity = 25,
                            Children = new List<Child>()
                        },
                        new Class()
                        {
                            Name = "Lienky",
                            Created = DateTime.Now,
                            CreatedBy = "admin",
                            Capacity = 25,
                            Children = new List<Child>()
                        }
                    },
                    AllowedUsers = "admin;lucia.spackova"
                };

                _context.Nurseries.Add(kidsParadiseRuz);
                _context.Addresses.Add(kidsParadiseRuz.Address);
                _context.Employees.AddRange(kidsParadiseRuz.Employees);
                _context.Classes.AddRange(kidsParadiseRuz.Classes);

                var kidsParadisePet = new Nursery()
                {
                    Name = "Kids Paradise - Petržalka",
                    Created = DateTime.Now,
                    CreatedBy = "admin",
                    Address = new Address()
                    {
                        Street = "Vyšehradská",
                        Number = "12",
                        City = "Bratislava",
                        Zip = 85106
                    },
                    Employees = new List<Employee>()
                    {
                        new Employee()
                        {
                            FullName = "Stanislava Rybnikárová",
                            JobTitle = "riaditeľka",
                            Employment = "plný úväzok",
                            Created = DateTime.Now,
                            CreatedBy = "admin",
                            Email = "vysehradska@kidsparadise.sk"
                        }
                    },
                    Classes = new List<Class>(),
                    AllowedUsers = "admin"
                };

                _context.Nurseries.Add(kidsParadisePet);
                _context.Addresses.Add(kidsParadisePet.Address);
                _context.Employees.AddRange(kidsParadisePet.Employees);

                _context.SaveChanges();
            }
        }
    }
}
