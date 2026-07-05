using LibraryManagementSystem.Data;
using LibraryManagementSystem.DTO.FinePenaltyDTO;
using LibraryManagementSystem.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FineController : LibraryUserController
    {
        private readonly ApplicationDBContext applicationDBContext;
        public FineController(ApplicationDBContext applicationDBContext)
        {
            this.applicationDBContext = applicationDBContext;
        }

        [HttpGet]
        [Authorize(Roles = "Librarian")]
        public IActionResult GetAllFineResults()
        {
            var data = applicationDBContext.FinePenalties
                        .Include(a => a.BorrowRecord)
                        .ThenInclude(a => a.Book)
                        .Include(a => a.User)
                        .Select(a => new ViewFinePenaltyDTO
                        {
                            BorrowID = a.BorrowID,
                            FineAmount = a.FineAmount,
                            FinePenaltyId = a.FinePenaltyId,
                            IssuedAt = a.IssuedAt,
                            IsPaid = a.IsPaid,
                            UserID = a.UserID,
                            PaidAt = a.PaidAt,
                            UserName = a.User.UserName,
                            BookTitle = a.BorrowRecord.Book.BookTitle
                        }).ToList();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Librarian")]
        public IActionResult GetFineResultsByID(int id)
        {

            var data = applicationDBContext.FinePenalties
                        .Include(a => a.BorrowRecord)
                        .ThenInclude(a => a.Book)
                        .Include(a => a.User)
                        .Where(a => a.FinePenaltyId == id)
                        .Select(a => new ViewFinePenaltyDTO
                        {
                            BorrowID = a.BorrowID,
                            FineAmount = a.FineAmount,
                            FinePenaltyId = a.FinePenaltyId,
                            IssuedAt = a.IssuedAt,
                            IsPaid = a.IsPaid,
                            UserID = a.UserID,
                            PaidAt = a.PaidAt,
                            UserName = a.User.UserName,
                            BookTitle = a.BorrowRecord.Book.BookTitle
                        }).FirstOrDefault();

            if (data == null)
            {
                return NotFound("Data Not Found");
            }

            return Ok(data);
        }

        [HttpGet("myFine")]
       
        public IActionResult GetFineResultsOfUser()
        {

            var userID = GetLoggedInUserId();

            var data = applicationDBContext.FinePenalties
                        .Include(a => a.BorrowRecord)
                        .ThenInclude(a => a.Book)
                        .Include(a => a.User)
                        .Where(a => a.UserID == userID)
                        .Select(a => new ViewFinePenaltyDTO
                        {
                            BorrowID = a.BorrowID,
                            FineAmount = a.FineAmount,
                            FinePenaltyId = a.FinePenaltyId,
                            IssuedAt = a.IssuedAt,
                            IsPaid = a.IsPaid,
                            UserID = a.UserID,
                            PaidAt = a.PaidAt,
                            UserName = a.User.UserName,
                            BookTitle = a.BorrowRecord.Book.BookTitle
                        }).ToList();

            return Ok(data);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Librarian")]
        public IActionResult PayFine(int id)
        {
            var data = applicationDBContext.FinePenalties.Find(id);

            if (data == null)
            {
                return NotFound("No Data Found");
            }

            if (data.IsPaid) return BadRequest("Already paid");

            data.IsPaid = true;
            data.PaidAt = DateTime.Now;

            applicationDBContext.SaveChanges();

            return Ok("Fine Paid Successfully");
        }
    }
}
