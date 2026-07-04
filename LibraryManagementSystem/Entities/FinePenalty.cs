using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystem.Entities
{
    public class FinePenalty
    {
        [Key]
        public int FinePenaltyId { get; set; }

        [Required]
        public int UserID { get; set; }
        [Required]
        public int BorrowID { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal FineAmount { get; set; }
        public bool IsPaid { get; set; } = false;
        public DateTime? PaidAt { get; set; }
        public DateTime IssuedAt { get; set; } =  DateTime.Now;

        [ForeignKey("UserID")]
        public User User { get; set; }

        [ForeignKey("BorrowID")]
        public BorrowRecord BorrowRecord { get; set; }
    }
}
