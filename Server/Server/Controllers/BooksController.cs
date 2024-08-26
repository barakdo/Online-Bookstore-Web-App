using Microsoft.AspNetCore.Mvc;
using Server.BL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        // GET: api/<BooksController>
        [HttpGet]
        public List<Object> Get()
        {
            return Book.GetBooks();
        }

        [HttpGet("searchBook/accordingTo/{accordingTo}/givenString/{givenString}")]
        public List<Object> GetSearchBook(string accordingTo, string givenString)
        {
            if (accordingTo == "author")
            {
                return Author.SearchAuthorObj(givenString);
               
            }
            else
            {
                return Book.SearchBook(accordingTo, givenString);
            }
        }

        // GET api/<BooksController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<BooksController>
        [HttpPost("authorFromBookId")]
        public List<Object> AuthorFromBookId([FromBody] int bookId)
        {
            return Book.AuthorFromBookId(bookId);
        }

        // POST api/<BooksController>
        [HttpPost("categoryFromBookId")]
        public List<Object> CategoryFromBookId([FromBody] int bookId)
        {
            return Book.CategoryFromBookId(bookId);
        }

        // PUT api/<BooksController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BooksController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
