namespace LibraryManagementSystem.DTO.FinePenaltyDTO
{
    public class ViewFinePenaltyDTO
    {
        public int FinePenaltyId { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;   
        public int BorrowID { get; set; }
        public string BookTitle { get; set; } = string.Empty;  
        public decimal FineAmount { get; set; }
        public bool IsPaid { get; set; }
        public DateTime IssuedAt { get; set; }
        public DateTime? PaidAt { get; set; }
    }
}
