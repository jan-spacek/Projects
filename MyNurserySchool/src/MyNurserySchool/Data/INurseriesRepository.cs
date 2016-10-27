using MyNurserySchool.Models;
using System.Collections.Generic;
using MyNurserySchool.ViewModels;
using MyNurserySchool.Authentication;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MyNurserySchool.Data
{
    public interface INurseriesRepository
    {
        #region GetAll
        IEnumerable<Nursery> GetAllNurseries(List<int> nursList);
        IEnumerable<Nursery> GetAllNurseries();
        IEnumerable<Class> GetAllClasses(int nurseryId);
        IEnumerable<Employee> GetAllEmployees(int nurseryId);
        IEnumerable<Child> GetAllChildren(int nurseryId);
        IEnumerable<ApplicationUser> GetAllUsers();
        IEnumerable<IdentityRole> GetAllRoles();
        #endregion

        #region Get
        Nursery GetNurseryById(int nurseryId);
        Employee GetEmployeeById(int employeeId);
        Child GetChildById(int childId);
        Class GetClassById(int classId);
        int? GetClassNurseryId(int classId);
        int? GetEmployeeNurseryId(int employeeId);
        #endregion

        #region Add
        void AddNursery(Nursery newNursery);
        void AddClass(int nurseryId, Class newClass);
        void AddAddress(Address address);
        void AddEmployee(Employee employee);
        void AddNote(Note note);
        void AddChild(Child child);
        #endregion

        #region Save
        void SaveNursery(Nursery nursery);
        void SaveClass(Class newClass);
        void SaveAddress(Address address);
        void SaveEmployee(Employee director);
        void SaveChild(Child child);
        #endregion

        #region Delete
        void DeleteNursery(int id);
        void DeleteAddress(int id);
        void DeleteEmployee(int id);
        void DeleteClass(int id);
        void DeleteChild(int id);
        void DeleteNote(int id);
        #endregion

        #region Common
        bool SaveAll();
        #endregion
    }
}