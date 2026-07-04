using LibraryManagementSystem.Data;
using LibraryManagementSystem.DTO;
using LibraryManagementSystem.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly ApplicationDBContext appDbcontext;
        public AuthorController(ApplicationDBContext appDbcontext)
        {
            this.appDbcontext = appDbcontext;
        }

        [HttpGet]
        public IActionResult getAllAuthors()
        {

            var data = appDbcontext.Authors.
                                    Include(b => b.Books).
                                    Select(a => new AuthorDTO
                                    {
                                        AuthorBio = a.AuthorBio,
                                        AuthorName = a.AuthorName,
                                        Books = a.Books.Select(
                                            b => new ViewBookDTO
                                            {
                                                BookTitle = b.BookTitle,
                                                AvailableBooks = b.AvailableBooks,
                                                PublishedYear = b.PublishedYear,
                                                TotalCopies = b.TotalCopies,
                                                PublisherName = b.PublisherName,
                                                Genre = b.Genre.ToString()
                                            }).ToList()
                                    }).ToList();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult getAuthorsByID(int id)
        {
            var data = appDbcontext.Authors
                        .Include(a => a.Books)
                        .Where(a=>a.AuthorId == id)
                        .Select(a => new AuthorDTO
                        {
                            AuthorBio = a.AuthorBio,
                            AuthorName = a.AuthorName,
                            Books = a.Books.Select(b => new ViewBookDTO
                            {
                                BookTitle = b.BookTitle,
                                AvailableBooks = b.AvailableBooks,
                                BorrowRecords = b.BorrowRecords,
                                PublishedYear = b.PublishedYear,
                                PublisherName = b.PublisherName,
                                Genre = b.Genre.ToString(),
                                Reservations = b.Reservations,
                                TotalCopies = b.TotalCopies
                            }).ToList()
                        }).FirstOrDefault();
            
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }

        [HttpPost]
        public IActionResult createAuthor(AuthorDTO authorDTO)
        {
            var data = new Author()
            {
                AuthorBio = authorDTO.AuthorBio,
                AuthorName = authorDTO.AuthorName
            };
            appDbcontext.Authors.Add(data);
            appDbcontext.SaveChanges();
            return Ok(data);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateAuthor(int id, AuthorDTO authorDTO)
        {
            var data = appDbcontext.Authors.Find(id);
            if (data == null)
            {
                return NotFound();
            }

            data.AuthorBio = authorDTO.AuthorBio;
            data.AuthorName = authorDTO.AuthorName;

            appDbcontext.SaveChanges();
            return Ok(data);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteAuthor(int id)
        {
            var data = appDbcontext.Authors.Find(id);
            if (data == null)
            {
                return NotFound("Data not found");
            }
            appDbcontext.Authors.Remove(data);
            appDbcontext.SaveChanges();
            return Ok(data);

        }
    }
}
