using LibraryManagementSystem.Entities;

namespace LibraryManagementSystem.DTO.BorrowRecordsDTO
{
    public class ViewBorrowRecordDTO
    {
        public int BorrowID { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int BookID { get; set; }
        public string BookTitle { get; set; }
        public DateTime BorrowedAt { get; set; } = DateTime.Now;
        public DateTime DueDate { get; set; }
        public DateTime? ReturnedAt { get; set; }
        public string BorrowStatus { get; set; }
        public decimal FinePenaltyAmount { get; set; }
        
    }
}
