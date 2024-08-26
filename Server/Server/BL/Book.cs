using Server.DAL;

namespace Server.BL
{
    public class Book
    {
        private int bookId;
        private string title;
        private string publisher;
        private DateTime publishDate;
        private string description;
        private int pageCount;
        private string isbn;
        private float averageRating;
        private int ratingCount;
        private string coverImgUrl;
        private string language;
        private float price;
        private bool digital;
        private string bookIdentifier;
        private string subtitle;
        private string previewLink;
        private string infoLink;
        private string textSnippet;

       
        public Book(int bookId, string title, string publisher, DateTime publishDate, string description, int pageCount, string isbn, float averageRating, int ratingCount, string coverImgUrl, string language, float price, bool digital, string bookIdentifier, string subtitle, string previewLink, string infoLink, string textSnippet)
        {
            this.BookId = bookId;
            this.Title = title;
            this.Publisher = publisher;
            this.PublishDate = publishDate;
            this.Description = description;
            this.PageCount = pageCount;
            this.Isbn = isbn;
            this.AverageRating = averageRating;
            this.RatingCount = ratingCount;
            this.CoverImgUrl = coverImgUrl;
            this.Language = language;
            this.Price = price;
            this.Digital = digital;
            this.BookIdentifier = bookIdentifier;
            this.Subtitle = subtitle;
            this.PreviewLink = previewLink;
            this.InfoLink = infoLink;
            this.TextSnippet = textSnippet;
        }

        public int BookId { get => bookId; set => bookId = value; }
        public string Title { get => title; set => title = value; }
        public string Publisher { get => publisher; set => publisher = value; }
        public DateTime PublishDate { get => publishDate; set => publishDate = value; }
        public string Description { get => description; set => description = value; }
        public int PageCount { get => pageCount; set => pageCount = value; }
        public string Isbn { get => isbn; set => isbn = value; }
        public float AverageRating { get => averageRating; set => averageRating = value; }
        public int RatingCount { get => ratingCount; set => ratingCount = value; }
        public string CoverImgUrl { get => coverImgUrl; set => coverImgUrl = value; }
        public string Language { get => language; set => language = value; }
        public float Price { get => price; set => price = value; }
        public bool Digital { get => digital; set => digital = value; }
        public string BookIdentifier { get => bookIdentifier; set => bookIdentifier = value; }
        public string Subtitle { get => subtitle; set => subtitle = value; }
        public string PreviewLink { get => previewLink; set => previewLink = value; }
        public string InfoLink { get => infoLink; set => infoLink = value; }
        public string TextSnippet { get => textSnippet; set => textSnippet = value; }

        public static List<Object> GetBooks()
        {
            DBservices db = new DBservices();
            return db.DB_AllBooksCategories();
        }

        public static List<Object> SearchBook(string accordingTo, string givenString)
        {
            givenString = givenString.ToLower();
            string temp;
            DBservices db = new DBservices();
            List<Book> bookList = db.DB_AllBooks();
            List<Object> returnList = new List<Object>();
            if (accordingTo == "books of author")
            {          
                List<Author> authors = Author.SearchAuthor(givenString);
                foreach (Author author in authors)
                {
                    DBservices db2 = new DBservices();
                    List<Book> tempList = db2.DB_AllBooksOfAuthor(author.Id);
                    foreach (Book book in tempList)
                    {
                        returnList.Add(book);
                    }
                }
                return returnList;
            }
            foreach (Book book in bookList)
            {
                switch (accordingTo)
                {
                    case "title":
                        temp = book.Title.ToLower();
                        if (temp.Contains(givenString))
                        {
                            returnList.Add(book);
                        }
                        break;
                    case "desc":
                        temp = book.Description.ToLower();
                        if (temp.Contains(givenString))
                        {
                            returnList.Add(book);
                        }
                        break;
                    case "publisher":
                        temp = book.Publisher.ToLower();
                        if (temp.Contains(givenString))
                        {
                            returnList.Add(book);
                        }
                        break;
                    case "subtitle":
                        temp = book.Subtitle.ToLower();
                        if (temp.Contains(givenString))
                        {
                            returnList.Add(book);
                        }
                        break;
                    case "year":
                        if (book.publishDate.Year == Convert.ToInt32(givenString))
                        {
                            returnList.Add(book);
                        }
                        break;                  
                    default:
                        break;
                }   
            }
            return returnList;
        }
        public static List<Object> AuthorFromBookId(int bookId)
        {
            DBservices db = new DBservices();
            return db.DB_authorFromBookId(bookId);
        }

        public static List<Object> CategoryFromBookId(int bookId)
        {
            DBservices db = new DBservices();
            return db.DB_CategoryFromBookId(bookId);
        }
    }
}
