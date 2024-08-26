using Microsoft.AspNetCore.Mvc;
using Server.BL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        // GET: api/<AuthorsController>
        [HttpGet]
        public List<Author> Get()
        {
            return Author.GetAuthors();
        }

        [HttpGet("partBooks/givenStr/{givenStr}")]
        public List<Author> Get(string givenStr)
        {
            return Author.GetPartAuthors(givenStr);
        }


        [HttpGet("allBooksAuthor/authorId/{authorId}")]
        public List<Book> GetAllBooksOfAuthor(int authorId)
        {
            return Author.AllBooksOfAuthor(authorId);
        }

        [HttpGet("allAuthorsAllBooks")]
        public List<Object> GetAllAuthorsAllBooks()
        {
            return Author.GetAllAuthorsAllBooks();
        }


        [HttpGet("searchAuthor/authorName/{authorName}")]
        public List<Author> GetSearchAuthor(string authorName)
        {
            return Author.SearchAuthor(authorName);
        }

        // GET api/<AuthorsController>/5
        [HttpGet("authorData/authorId/{authorId}")]
        public Object Get(int authorId)
        {
            return Author.GetAuthorInfo(authorId);
        }

        // POST api/<AuthorsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AuthorsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AuthorsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
