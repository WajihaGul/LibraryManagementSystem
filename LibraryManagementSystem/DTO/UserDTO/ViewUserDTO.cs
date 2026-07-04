using LibraryManagementSystem.Entities;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.DTO.UserDTO
{
    public class ViewUserDTO
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; } 
        public bool IsActive { get; set; } 
    }
}