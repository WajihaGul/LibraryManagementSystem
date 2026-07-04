using LibraryManagementSystem.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystem.DTO.ReservationDTO
{
    public class ViewReservationDTO
    {
        public int ReservationId { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;
        public int BookID { get; set; }
        public string BookTitle { get; set; } = string.Empty;
        public DateTime ReservedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
        public string ReservationStatus { get; set; } = string.Empty;
    }
}
