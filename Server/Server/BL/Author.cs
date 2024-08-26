using Server.DAL;

namespace Server.BL
{
    public class Author
    {
        private int id;
        private string name;
        private int year;
        private string authorImg;
        private string description;

        public Author(int id, string name, int year, string authorImg, string description)
        {
            this.Id = id;
            this.Name = name;
            this.Year = year;
            this.AuthorImg = authorImg;
            this.Description = description;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }

        public int Year { get => year; set => year = value; }
        public string AuthorImg { get => authorImg; set => authorImg = value; }
        public string Description { get => description; set => description = value; }

        public static List<Author> GetAuthors()
        {
            DBservices db = new DBservices();
            return db.DB_AllAuthors();
        }

        public static List<Book> AllBooksOfAuthor(int authorId)
        {
            DBservices db = new DBservices();
            return db.DB_AllBooksOfAuthor(authorId);
        }

        public static List<Author> SearchAuthor(string authorName)
        {
            authorName = authorName.ToLower();
            DBservices db = new DBservices();
            List<Author> authorList = db.DB_AllAuthors();
            List<Author> returnList = new List<Author>();
            foreach (Author author in authorList)
            {
                string temp = author.Name.ToLower();
                if (temp.Contains(authorName))
                {
                    returnList.Add(author);
                }
            }
            return returnList;
        }

        public static List<Object> SearchAuthorObj(string authorName)
        {
            List<Object> returnList = new List<Object>();
            List<Author> authors = SearchAuthor(authorName);
            foreach (Author author in authors)
            {
                returnList.Add(author); 
            }
            return returnList;
        }
        
        public static Object GetAuthorInfo(int authorId)
        {
            DBservices db = new DBservices();
            return db.DB_AuthorInfo(authorId);
        }

        public static List<Object> GetAllAuthorsAllBooks()
        {
            DBservices db = new DBservices();
            return db.DB_AllAuthorsAllBooks();
        }
        public static List<Author> GetPartAuthors(string givenStr)
        {
            givenStr = givenStr.ToLower();
            List<Author> allAuthors = GetAuthors();
            List<Author> returnedList = new List<Author>();
            foreach (Author author in allAuthors)
            {
                string name = author.Name.ToLower();
                if (name.Contains(givenStr))
                {
                    returnedList.Add(author);
                }
            }
            return returnedList;
        }
    }   
}
