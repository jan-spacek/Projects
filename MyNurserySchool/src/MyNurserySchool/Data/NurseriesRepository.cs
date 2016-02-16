using Microsoft.Data.Entity;
using Microsoft.Extensions.Logging;
using MyNurserySchool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using MyNurserySchool.ViewModels;

namespace MyNurserySchool.Data
{
    public class NurseriesRepository : INurseriesRepository
    {
        private NurseryDbContext _context;
        private ILogger<NurseriesRepository> _logger;

        public NurseriesRepository(NurseryDbContext context, ILogger<NurseriesRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        #region GetAll
        public IEnumerable<Nursery> GetAllNurseries(List<int> nursList)
        {
            try {
                return _context.Nurseries
                    .Include(n => n.Classes)
                    .Include(n => n.Employees)
                    .Include(n => n.Address)
                    .Include(n => n.Director)
                    .OrderBy(n => n.Name)
                    .Where(n => nursList.Contains(n.Id))
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
                var listOfClasses = _context.Classes.Where(r => r.NurseryId == nurseryId).Select(r => r.Id).ToList();
                var children = _context.Children
                    .Include(c => c.Notes)
                    .OrderBy(c => c.BirthDate)
                    .Where(c => listOfClasses.Contains(c.ClassId ?? 0));

                return children;
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get Children from database", ex);
                return null;
            }
        }
        #endregion

        #region Get
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
            Class result = _context.Classes
                        .Include(c => c.ClassTeacher)
                        .Include(c => c.Children)
                        .Where(c => c.Id == classId)
                        .FirstOrDefault();

            return result;
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
        public int? GetChildsNurseryId(Child child)
        {
            var cls = GetClassById((int)child.ClassId);
            return cls.NurseryId;
        }
        public int? GetClassNurseryId(int classId)
        {
            var cls = GetClassById(classId);
            return cls.NurseryId;
        }

        public int? GetEmployeeNurseryId(int employeeId)
        {
            var emp = GetEmployeeById(employeeId);
            return emp.NurseryId;
        }
        #endregion

        #region Add
        public void AddNursery(Nursery nursery)
        {
            _context.Add(nursery);
        }
        public void AddClass(int nurseryId, Class newClass)
        {
            var nursery = GetNurseryById(nurseryId);
            nursery.Classes.Add(newClass);
        }
        public void AddEmployee(Employee employee)
        {
            if (employee.Address != null)
                AddAddress(employee.Address);
            _context.Employees.Add(employee);
        }
        public void AddAddress(Address address)
        {
            _context.Addresses.Add(address);
        }
        public void AddNote(Note note)
        {
            _context.Notes.Add(note);
        }
        public void AddChild(Child child)
        {
            if (child.Address != null)
                AddAddress(child.Address);
            _context.Children.Add(child);
        }
        #endregion

        #region Save
        public void SaveNursery(Nursery nursery)
        {
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
            if (address.Id < 1)
                _context.Addresses.Add(address);
            else
                _context.Addresses.Update(address);
        }
        public void SaveChild(Child child)
        {
            _context.Children.Update(child);
        }
        #endregion

        #region Delete
        public void DeleteNursery(int id)
        {
            IEnumerable<Nursery> nurseries = GetAllNurseries();
            foreach (Nursery nur in nurseries)
            {
                if (nur.Id == id)
                {
                    _context.Nurseries.Remove(nur);

                    if (nur.Address != null)
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
                    _context.Employees.Remove(e);
                    if (e.Address != null)
                        DeleteAddress(e.Address.Id);
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
                    _context.Children.Remove(c);
                    if (c.Address != null)
                        DeleteAddress(c.Address.Id);
                }
            _context.SaveChanges();
        }
        public void DeleteNote(int id)
        {
            foreach (Note n in _context.Notes)
                if (n.Id == id)
                    _context.Notes.Remove(n);

            _context.SaveChanges();
        }
        #endregion

        #region Common
        public bool SaveAll()
        {
            // ak je zmien viac ako 0, tak sa nieco zmenilo
            return _context.SaveChanges() > 0;
        }
        #endregion

    }
}
