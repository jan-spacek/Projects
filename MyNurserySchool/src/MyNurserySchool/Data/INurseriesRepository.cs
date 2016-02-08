using MyNurserySchool.Models;
using System.Collections.Generic;

namespace MyNurserySchool.Data
{
    public interface INurseriesRepository
    {
        IEnumerable<Nursery> GetAllNurseries(string name);
        IEnumerable<Class> GetAllClasses();
        IEnumerable<Employee> GetAllEmployees(int nurseryId);
        IEnumerable<Child> GetAllChildren();
        void AddNursery(Nursery newNursery);
        bool SaveAll();
        Nursery GetNurseryById(int nurseryId);
        void AddClass(int nurseryId, Class newClass);
        int GetNurseryIdByUserName(string name);
        bool HasAccess(int id, string name);
        void AddAddress(Address address);
        void AddEmployee(Employee employee);
        void SaveNursery(Nursery nursery);
        void SaveClass(Class newClass);
        void SaveAddress(Address address);
        void SaveEmployee(Employee director);
        void DeleteNursery(int id);
        void DeleteAddress(int id);
        void DeleteEmployee(int id);
        object GetClassById(int classId);
        void DeleteClass(int id);
        void DeleteChild(int id);
    }
}