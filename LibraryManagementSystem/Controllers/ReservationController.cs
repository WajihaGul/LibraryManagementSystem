using LibraryManagementSystem.Data;
using LibraryManagementSystem.DTO.ReservationDTO;
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
    public class ReservationController : LibraryUserController
    {
        private readonly ApplicationDBContext applicationDBContext;

        public ReservationController(ApplicationDBContext applicationDBContext) 
        {
            this.applicationDBContext = applicationDBContext;
        }

        [HttpGet]
        [Authorize(Roles = "Librarian")]
        public IActionResult GetAllReservations()
        {
            var data = applicationDBContext.Reservations
                        .Include(a=> a.Book)
                        .Include(a=>a.User)
                        .Select(a=>new ViewReservationDTO
                        {
                            BookID = a.BookID,
                            BookTitle = a.Book.BookTitle,
                            ReservationId = a.ReservationId,
                            ExpiresAt = a.ExpiresAt,
                            ReservationStatus = a.Status,
                            ReservedAt = a.ReservedAt,
                            UserID = a.UserID,
                            UserName = a.User.UserName
                        }).ToList();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Librarian")]
        public IActionResult GetReservationsByID(int id)
        {
            var data = applicationDBContext.Reservations
                        .Include(a => a.Book)
                        .Include(a => a.User)
                        .Where(a=>a.ReservationId == id)
                        .Select(a => new ViewReservationDTO
                        {
                            BookID = a.BookID,
                            BookTitle = a.Book.BookTitle,
                            ReservationId = a.ReservationId,
                            ExpiresAt = a.ExpiresAt,
                            ReservationStatus = a.Status,
                            ReservedAt = a.ReservedAt,
                            UserID = a.UserID,
                            UserName = a.User.UserName
                        }).FirstOrDefault();

            if(data == null)
            {
                return NotFound("Data not found");
            }

            return Ok(data);
        }

        [HttpGet("myReservation")]
        public IActionResult GetMyReservations()
        {

            var userID = GetLoggedInUserId();

            var data = applicationDBContext.Reservations
                        .Include(a => a.Book)
                        .Include(a => a.User)
                        .Where(a => a.UserID == userID)
                        .Select(a => new ViewReservationDTO
                        {
                            BookID = a.BookID,
                            BookTitle = a.Book.BookTitle,
                            ReservationId = a.ReservationId,
                            ExpiresAt = a.ExpiresAt,
                            ReservationStatus = a.Status,
                            ReservedAt = a.ReservedAt,
                            UserID = a.UserID,
                            UserName = a.User.UserName
                        }).ToList();

            return Ok(data);
        }

        [HttpPost]
        [Route("{id:int}")]
        public IActionResult BookAReservations(int id)
        {
            var userID = GetLoggedInUserId();

            var bookData = applicationDBContext.Books.Find(id);

            if(bookData == null)
            {
                return NotFound("Book not Found");
            }

            if (bookData.AvailableBooks > 0)
                return BadRequest("Book is available — borrow it instead of reserving.");

            var alreadyReserved = applicationDBContext.Reservations
                                .Any(a => a.BookID == id && 
                                     a.UserID == userID && 
                                     a.Status == ReservationStatus.Pending);

            if (alreadyReserved)
            {
                return BadRequest("You have already reserved this Book");
            }

            var res = new Reservation()
            {
                BookID = id,
                ExpiresAt = DateTime.Now.AddDays(10),
                UserID = userID
            };

            applicationDBContext.Reservations.Add(res);
            applicationDBContext.SaveChanges();

            return Ok("Book got reserved successfully");
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Librarian")]
        public IActionResult UpdateReservations(int id,UpdateReservationDTO updateReservationDTO)
        {

            var data = applicationDBContext.Reservations.Find(id);

            if (data == null)
            {
                return NotFound("Reservations not Found");
            }

            data.Status = updateReservationDTO.status;

            applicationDBContext.SaveChanges();

            return Ok("Reservation updated successfully");
        }

    }
}
