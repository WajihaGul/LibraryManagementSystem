using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystem.Entities
{
    public enum ReservationStatus
    {
        Pending,
        Fulfilled,
        Cancelled,
        Expired
    }
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }

        [Required]
        public int UserID { get; set; }
        [Required]
        public int BookID { get; set; }

        public DateTime ReservedAt { get; set; } = DateTime.Now;
        public DateTime ExpiresAt { get; set; }
        public ReservationStatus Status { get; set; } = ReservationStatus.Pending;

        [ForeignKey("UserID")]
        public User User { get; set; }

        [ForeignKey("BookID")]
        public Book Book { get; set; }
    }
}
