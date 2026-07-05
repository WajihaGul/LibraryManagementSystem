using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LibraryManagementSystem.Controllers
{
   
    [ApiController]
    public class LibraryUserController : ControllerBase
    {
        protected int GetLoggedInUserId()
        {
            return int.Parse(User.FindFirst("UserID")!.Value);
        }
        protected string GetLoggedInUserName()
        {
            return User.FindFirst(ClaimTypes.Name)!.Value;
        }
    }
}