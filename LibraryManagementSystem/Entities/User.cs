using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Entities
{
    public enum UserRole
    {
        Librarian,
        Member
    }
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public UserRole Role { get; set; } = UserRole.Member;
        public bool IsActive { get; set; } = true;

        public ICollection<BorrowRecord> BorrowRecords { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<FinePenalty> FinePenalties { get; set; }
    }
}
