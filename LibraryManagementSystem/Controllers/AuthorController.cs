using LibraryManagementSystem.Data;
using LibraryManagementSystem.DTO.AuthorDTO;
using LibraryManagementSystem.DTO.BookDTO;
using LibraryManagementSystem.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
                                    Select(a => new ViewAuthorDTO
                                    {
                                        AuthorId = a.AuthorId,
                                        AuthorBio = a.AuthorBio,
                                        AuthorName = a.AuthorName,
                                        Books = a.Books.Select(
                                            b => new BookSummaryDTO
                                            {
                                                BookId = b.BookId,
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
                        .Where(a => a.AuthorId == id)
                        .Select(a => new ViewAuthorDTO
                        {
                            AuthorId = a.AuthorId,
                            AuthorBio = a.AuthorBio,
                            AuthorName = a.AuthorName,
                            Books = a.Books.Select(b => new BookSummaryDTO
                            {
                                BookId = b.BookId,
                                BookTitle = b.BookTitle,
                                AvailableBooks = b.AvailableBooks,
                                PublishedYear = b.PublishedYear,
                                PublisherName = b.PublisherName,
                                Genre = b.Genre.ToString(),
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
        [Authorize(Roles = "Librarian")]
        public IActionResult createAuthor(AddAuthorDTO addAuthorDTO)
        {
            var data = new Author()
            {
                AuthorBio = addAuthorDTO.AuthorBio,
                AuthorName = addAuthorDTO.AuthorName
            };
            appDbcontext.Authors.Add(data);
            appDbcontext.SaveChanges();
            return Ok("New Author Added Successfully");
        }

        [HttpPut]
        [Authorize(Roles = "Librarian")]
        [Route("{id:int}")]
        public IActionResult UpdateAuthor(int id, AddAuthorDTO addAuthorDTO)
        {
            var data = appDbcontext.Authors.Find(id);
            if (data == null)
            {
                return NotFound();
            }

            data.AuthorBio = addAuthorDTO.AuthorBio;
            data.AuthorName = addAuthorDTO.AuthorName;

            appDbcontext.SaveChanges();
            return Ok("Author Updated Successfully");
        }

        [HttpDelete]
        [Authorize(Roles = "Librarian")]
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
            return Ok("Deleted successfully");

        }
    }
}
