using Microsoft.Data.Entity;
using Microsoft.Extensions.Logging;
using MyNurserySchool.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyNurserySchool.Data
{
    public class NurseriesRepository : INurseriesRepository
    {
        private DbContext _context;
        private ILogger<NurseriesRepository> _logger;

        public NurseriesRepository(DbContext context, ILogger<NurseriesRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public IEnumerable<Nursery> GetAllNurseries(string name)
        {
            try {
                return _context.Nurseries
                    .Include(n => n.Classes)
                    .Include(n => n.Employees)
                    .Include(n => n.Address)
                    .Include(n => n.Director)
                    .OrderBy(n => n.Name)
                    .Where(n => n.AllowedUsers.Contains(name))
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get Nurseries from database", ex);
                return null;
            }
        }

        public IEnumerable<Nursery> GetAllNurseries()
        {
            try
            {
                return _context.Nurseries
                    .Include(n => n.Classes)
                    .Include(n => n.Employees)
                    .Include(n => n.Address)
                    .Include(n => n.Director)
                    .OrderBy(n => n.Id)
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get Nurseries from database", ex);
                return null;
            }
        }

        public IEnumerable<Class> GetAllClasses(int nurseryId)
        {
            try
            {
                return _context.Classes
                    .Include(c => c.Children)
                    .Include(c => c.ClassTeacher)
                    .OrderBy(c => c.Name)
                    .Where(c => c.NurseryId == nurseryId)
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get Classes from database", ex);
                return null;
            }
        }
        
        public IEnumerable<Employee> GetAllEmployees(int nurseryId)
        {
            try
            {
                return _context.Employees
                    .Include(e => e.Notes)
                    .OrderBy(e => e.Id)
                    .Where(e => e.NurseryId == nurseryId)
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get Employees from database", ex);
                return null;
            }
        }

        public IEnumerable<Child> GetAllChildren(int nurseryId)
        {
            try
            {
                var listOfClasses = _context.Classes.Select(r => r.Id).ToList();
                var children = _context.Children
                    .Include(c => c.Notes)
                    .OrderBy(c => c.DateOfBirth)
                    .Where(r => listOfClasses.Contains(r.ClassId??0));

                return children;
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get Children from database", ex);
                return null;
            }
        }

        public void AddNursery(Nursery newNursery)
        {
            _context.Add(newNursery);
        }

        public bool SaveAll()
        {
            // ak je zmien viac ako 0, tak sa nieco zmenilo
            return _context.SaveChanges() > 0;
        }

        public Nursery GetNurseryById(int nurseryId)
        {
            return _context.Nurseries
                        .Include(n => n.Classes)
                        .Include(n => n.Director)
                        .Include(n => n.Address)
                        .Include(n => n.Employees)
                        .Where(n => n.Id == nurseryId)
                        .FirstOrDefault();
        }
        
        public Class GetClassById(int classId)
        {
            return _context.Classes.Include(c => c.ClassTeacher)
                        .Include(c => c.Children)
                        .Where(c => c.Id == classId)
                        .FirstOrDefault();
        }

        public Employee GetEmployeeById(int employeeId)
        {
            return _context.Employees.Include(e => e.Address)
                        .Include(e => e.Notes)
                        .Where(e => e.Id == employeeId)
                        .FirstOrDefault();
        }

        public Child GetChildById(int childId)
        {
            return _context.Children
                        .Include(c => c.Address)
                        .Include(c => c.Notes)
                        .Where(c => c.Id == childId)
                        .FirstOrDefault();
        }

        public void AddClass(int nurseryId, Class newClass)
        {
            var nursery = GetNurseryById(nurseryId);
            nursery.Classes.Add(newClass);
        }

        public void AddEmployee(Employee newEmployee)
        {
            _context.Employees.Add(newEmployee);
        }
        
        public void AddAddress(Address newAddress)
        {
            _context.Addresses.Add(newAddress);
        }
        
        public void SaveNursery(Nursery nursery)
        {
            //using (var newContext = new NurseryContext())
            //{
            //    newContext.Nurseries.Attach(nursery);
            //    newContext.Entry(nursery).Property(n => n.Name).IsModified = true;
            //    newContext.Entry(nursery).Property(n => n.Description).IsModified = true;
            //    newContext.Entry(nursery).Property(n => n.Director).IsModified = true;
            //    newContext.SaveChanges();
            //}

            _context.Nurseries.Update(nursery);
        }

        public void SaveClass(Class newClass)
        {
            _context.Classes.Update(newClass);
        }

        public void SaveEmployee(Employee employee)
        {
            _context.Employees.Update(employee);
        }

        public void SaveAddress(Address address)
        {
            _context.Addresses.Update(address);
        }

        public int GetNurseryIdByUserName(string name)
        {
            foreach (Nursery n in _context.Nurseries)
            {
                if (n.AllowedUsers.Contains(name))
                    return n.Id;
            }

            return 0;
        }

        public bool HasAccess(int id, string name)
        {
            foreach (Nursery n in _context.Nurseries)
            {
                if (n.Id == id && n.AllowedUsers.Contains(name))
                    return true;
            }

            return false;
        }

        public void DeleteNursery(int id)
        {
            IEnumerable<Nursery> nurseries = GetAllNurseries();
            foreach (Nursery nur in nurseries)
            {
                if (nur.Id == id)
                {
                    _context.Nurseries.Remove(nur);

                    DeleteAddress(nur.Address.Id);
                    foreach (Employee emp in nur.Employees)
                        DeleteEmployee(emp.Id);
                    foreach (Class cls in nur.Classes)
                        DeleteClass(cls.Id);

                    _context.SaveChanges();
                    return;
                }
            }
        }

        public void DeleteAddress(int id)
        {
            foreach (Address a in _context.Addresses)
                if (a.Id == id)
                {
                    _context.Addresses.Remove(a);
                }
        }

        public void DeleteEmployee(int id)
        {
            foreach (Employee e in _context.Employees.Include(e => e.Address))
                if (e.Id == id)
                {
                    int addrId = e.Address.Id;
                    _context.Employees.Remove(e);
                    DeleteAddress(addrId);
                }
            _context.SaveChanges();
        }

        public void DeleteClass(int id)
        {
            foreach (Class cls in _context.Classes)
                if (cls.Id == id)
                {
                    _context.Classes.Remove(cls);
                    if (cls.Children != null)
                        foreach (Child child in cls.Children)
                            DeleteChild(child.Id);
                }
            _context.SaveChanges();
        }

        public void DeleteChild(int id)
        {
            foreach (Child c in _context.Children)
                if (c.Id == id)
                {
                    int addrId = c.Address.Id;
                    _context.Children.Remove(c);
                    DeleteAddress(addrId);
                }
            _context.SaveChanges();
        }
    }
}
