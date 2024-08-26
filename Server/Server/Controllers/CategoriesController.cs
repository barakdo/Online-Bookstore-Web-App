using Microsoft.AspNetCore.Mvc;
using Server.BL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        // GET: api/<CategoriesController>
        [HttpGet]
        public List<Category> Get()
        {
            return Category.GetAllCategories(); ;
        }

        [HttpGet("allBooksCategory")]
        public List<Category> GetAllBooksCategory()
        {
            return Category.GetAllCategories(); ;
        }

        [HttpGet("allBooksAllCategory")]
        public List<Object> GetAllBooksAllCategory()
        {
            return Category.GetAllBooksCategory(); ;
        }

        [HttpGet("book/categoryId/{categoryId}")]
        public List<Object> GetBookCategory(int categoryId)
        {
            return Category.GetAllCategoriesBooks(categoryId); ;
        }

        [HttpGet("img")]
        public List<Object> GetImgCategory()
        {
            return Category.GetAllCategoriesImages(); ;
        }

        // GET api/<CategoriesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CategoriesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CategoriesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
