using Server.DAL;

namespace Server.BL
{
    public class User
    {
        private string email;
        private string username;
        private string pass;

        public User(string email, string username, string pass)
        {
            this.email = email;
            this.username = username;
            this.pass = pass;
        }

        public string Email { get => email; set => email = value; }
        public string Username { get => username; set => username = value; }
        public string Pass { get => pass; set => pass = value; }

        public static List<User> GetAllUsers()
        {
            DBservices db = new DBservices();
            return db.DB_AllUsers();
        }
        public static bool ChangeBookUserRead(string email, int bookId)
        {
            DBservices db1 = new DBservices();
            List<Book> books = db1.DB_UserAllBooksRead(email);
            DBservices db2 = new DBservices();
            foreach (Book book in books)
            {
                if (book.BookId == bookId)
                {
                    db2.DB_DeleteBookUserRead(email, book.BookId);
                    return false;
                }
            }
            db2.DB_AddBookUserRead(email, bookId);
            return true;
        }
        public static bool ChangeBookUserWant(string email, int bookId)
        {
            DBservices db1 = new DBservices();
            List<Book> books = db1.DB_UserAllBooksWant(email);
            DBservices db2 = new DBservices();
            foreach (Book book in books)
            {
                if (book.BookId == bookId)
                {
                    db2.DB_DeleteBookUserWant(email, book.BookId);
                    return false;
                }
            }
            db2.DB_AddBookUserWant(email, bookId);
            return true;
        }

        public static List<object> GetAllBooksUserWant()
        {
            DBservices db = new DBservices();
            return db.DB_AllUserAllBooksWant();
        }
        public static List<object> GetAllBooksUserRead()
        {
            DBservices db = new DBservices();
            return db.DB_AllUserAllBooksRead();
        }

        public static List<Book> GetSpecBooksUserWant(string email)
        {
            DBservices db = new DBservices();
            return db.DB_UserAllBooksWant(email);
        }
        public static List<Book> GetSpecBooksUserRead(string email)
        {
            DBservices db = new DBservices();
            return db.DB_UserAllBooksRead(email);
        }

        public static Object IfUserExists(string email, string pass)
        {
            DBservices db = new DBservices();
            List<User> users = db.DB_AllUsers();
            foreach (User user in users)
            {
                if (user.email == email && user.pass == pass)
                {
                    return new
                    {
                        email = email,
                        name = user.Username,
                        pass = pass
                    };
                }
            }
            return null;
        }

        public static bool AddUser(string email, string username, string pass)
        {
            DBservices db = new DBservices();
            db.DB_AddUser(email, username, pass);
            return true;

        }

    }
}
