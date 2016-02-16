﻿using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using MyNurserySchool.Authentication;
using MyNurserySchool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MyNurserySchool.Data
{
    public class NurseryDbContextSeedData
    {
        private NurseryDbContext _context;
        private UserManager<StandardUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;

        public NurseryDbContextSeedData(NurseryDbContext context, UserManager<StandardUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task EnsureSeedDataAsync()
        {
            string roleName = "Admin";
            if (await _roleManager.FindByNameAsync("Admin") == null)
            {
                var str = _roleManager.CreateAsync(new IdentityRole(roleName));
            }

            roleName = "Editor";
            if (await _roleManager.FindByNameAsync("Editor") == null)
            {
                var str = _roleManager.CreateAsync(new IdentityRole(roleName));
            }

            roleName = "Viewer";
            if (await _roleManager.FindByNameAsync("Viewer") == null)
            {
                var str = _roleManager.CreateAsync(new IdentityRole(roleName));
            }

            if (await _userManager.FindByNameAsync("admin") == null)
            {
                var newUser = new StandardUser
                {
                    UserName = "admin",
                    Email = "admin@example.com"
                };

                await _userManager.CreateAsync(newUser, "P@ssw0rd");
                var roleresult = await _userManager.AddToRoleAsync(newUser, "Admin");
                await _userManager.AddClaimAsync(newUser, new Claim("Nursery", "1"));
                await _userManager.AddClaimAsync(newUser, new Claim("Nursery", "2"));
            }

            if (await _userManager.FindByNameAsync("editor") == null)
            {
                var newUser = new StandardUser
                {
                    UserName = "editor",
                    Email = "editor@example.com"
                };

                await _userManager.CreateAsync(newUser, "P@ssw0rd");
                var roleresult = await _userManager.AddToRoleAsync(newUser, "Editor");
                await _userManager.AddClaimAsync(newUser, new Claim("Nursery", "1"));
            }

            if (await _userManager.FindByNameAsync("editor2") == null)
            {
                var newUser = new StandardUser
                {
                    UserName = "editor2",
                    Email = "editor2@example.com"
                };

                await _userManager.CreateAsync(newUser, "P@ssw0rd");
                var roleresult = await _userManager.AddToRoleAsync(newUser, "Editor");
                await _userManager.AddClaimAsync(newUser, new Claim("Nursery", "1"));
                await _userManager.AddClaimAsync(newUser, new Claim("Nursery", "2"));
            }

            if (await _userManager.FindByNameAsync("viewer") == null)
            {
                var newUser = new StandardUser
                {
                    UserName = "viewer",
                    Email = "viewer@example.com"
                };

                await _userManager.CreateAsync(newUser, "P@ssw0rd");
                var roleresult = await _userManager.AddToRoleAsync(newUser, "Viewer");
                await _userManager.AddClaimAsync(newUser, new Claim("Nursery", "1"));
            }

            if (!_context.Nurseries.Any())
            {
                var kidsParadiseRuz = new Nursery()
                {
                    Name = "Kids Paradise - Ružinov",
                    Created = DateTime.Now,
                    CreatedBy = "admin",
                    Modified = DateTime.Now,
                    ModifiedBy = "admin",
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
                            BirthDate = new DateTime(1990, 8, 1),
                            StartDate = new DateTime(2014, 9, 1),
                            JobTitle = "riaditeľka",
                            Employment = "plný úväzok",
                            Created = DateTime.Now,
                            CreatedBy = "admin",
                            Modified = DateTime.Now,
                            ModifiedBy = "admin",
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
                            Modified = DateTime.Now,
                            ModifiedBy = "admin",
                            Capacity = 25,
                            Children = new List<Child>()
                            {
                                new Child()
                                {
                                    FirstName = "Jožko",
                                    LastName = "Mrkvička",
                                    Created = DateTime.Now,
                                    CreatedBy = "admin",
                                    Modified = DateTime.Now,
                                    ModifiedBy = "admin"
                                },
                                new Child()
                                {
                                    FirstName = "Ferko",
                                    LastName = "Malý",
                                    Created = DateTime.Now,
                                    CreatedBy = "admin",
                                    Modified = DateTime.Now,
                                    ModifiedBy = "admin"
                                }
                            }
                        },
                        new Class()
                        {
                            Name = "Lienky",
                            Created = DateTime.Now,
                            CreatedBy = "admin",
                            Modified = DateTime.Now,
                            ModifiedBy = "admin",
                            Capacity = 25,
                            Children = new List<Child>()
                        }
                    }
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
                    Modified = DateTime.Now,
                    ModifiedBy = "admin",
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
                            Modified = DateTime.Now,
                            ModifiedBy = "admin",
                            Email = "vysehradska@kidsparadise.sk"
                        }
                    },
                    Classes = new List<Class>()
                };

                _context.Nurseries.Add(kidsParadisePet);
                _context.Addresses.Add(kidsParadisePet.Address);
                _context.Employees.AddRange(kidsParadisePet.Employees);

                _context.SaveChanges();
            }
        }
    }
}
