using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context; 
        public UsersController (DataContext context)
        {
            _context = context;       
            
         }
         

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await  _context.Users.ToListAsync();

        }
        
        [HttpGet("{id}")] // api/users/3
        [Authorize]
        public async Task<ActionResult<AppUser>> GetUser(int id )
        {
          return await  _context.Users.FindAsync(id);
            

        }
    }// end of the class 
}