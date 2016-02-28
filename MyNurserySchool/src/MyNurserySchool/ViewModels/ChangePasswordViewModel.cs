using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyNurserySchool.ViewModels
{
    public class ChangePasswordViewModel
    {
        [Required(ErrorMessage = "{0} je povinné pole.")]
        [DataType(DataType.Password)]
        [Display(Name = "Staré heslo")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "{0} je povinné pole.")]
        [StringLength(100, ErrorMessage = "{0} musí obsahovať aspoň {2} znakov.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Nové heslo")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Potvrdenie nového hesla")]
        [Compare("NewPassword", ErrorMessage = "Potvrdenie nového hesla a nové heslo sa nezhodujú.")]
        public string ConfirmPassword { get; set; }
    }
}
