using Microsoft.AspNetCore.Mvc;
using Server.BL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET: api/<UsersController>
        [HttpGet]
        public List<User> Get()
        {
            return BL.User.GetAllUsers();
        }

        [HttpGet("allUserBooksWant")]
        public List<Object> GetAllUserBooksWant()
        {
            return BL.User.GetAllBooksUserWant();
        }

        [HttpGet("allUserBooksRead")]
        public List<Object> GetAllUserBooksRead()
        {
            return BL.User.GetAllBooksUserRead();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UsersController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPost("changeBookWant/email/{email}/bookId/{bookId}")]
        public bool PostUserWantBook(string email, int bookId)
        {
            return BL.User.ChangeBookUserWant(email, bookId);
        }

        [HttpPost("changeBookRead/email/{email}/bookId/{bookId}")]
        public bool PostUserReadBook(string email, int bookId)
        {
            
            return BL.User.ChangeBookUserRead(email, bookId);
        }

        [HttpPost("UserBookWant")]
        public List<Book> GetUserWantBook([FromBody] string email)
        {
            return BL.User.GetSpecBooksUserWant(email);
        }

        [HttpPost("UserBookRead")]
        public List<Book> GetUserReadBook([FromBody] string email)
        {
            return BL.User.GetSpecBooksUserRead(email);
        }

        [HttpPost("ifUserExists")]
        public Object CheckUserExistence([FromBody] string[] user)
        {
            return BL.User.IfUserExists(user[0], user[1]);
        }

        [HttpPost("AddUser")]
        public bool AddUser([FromBody] string[] user)
        {
            return BL.User.AddUser(user[0], user[1], user[2]);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
