using System.Collections.Generic;

namespace MyNurserySchool.ViewModels
{
    public class NurseryBasicViewModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public virtual IEnumerable<ClassBasicViewModel> classes { get; set; }
    }
}