using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystem.Entities
{
    public enum BorrowStatus
    {
        Borrowed,
        Returned,
        Overdue
    }
    public class BorrowRecord
    {
        [Key]
        public int BorrowID { get; set; }
        
        [Required]
        public int UserID { get; set; }
        [Required]
        public int BookID { get; set; }
        
        public DateTime BorrowedAt { get; set; } = DateTime.Now;
        public DateTime DueDate { get; set; }
        public DateTime? ReturnedAt { get; set; }
        public BorrowStatus Status { get; set; }

        [ForeignKey("UserID")]
        public User User { get; set; }

        [ForeignKey("BookID")]
        public Book Book { get; set; }

        public FinePenalty? FinePenalty { get; set; }
    }
}
