using System.Data;
using System.Data.SqlClient;
using Server.BL;
using static System.Reflection.Metadata.BlobBuilder;

namespace Server.DAL
{
    public class DBservices
    {
        public SqlConnection connect(String conString)
        {

            // read the connection string from the configuration file
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json").Build();
            string cStr = configuration.GetConnectionString("myProjDB");
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }



        //--------------------------------------------------------------------------------------------------
        // This method return all books
        //--------------------------------------------------------------------------------------------------

        public List<Book> DB_AllBooks()
        {
            List<Book> books = new List<Book>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_AllBooks", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    int bookId = Convert.ToInt32(dataReader["id"]);
                    string title = dataReader["title"].ToString();
                    string publisher = dataReader["publisher"].ToString();
                    DateTime publishDate = Convert.ToDateTime(dataReader["publishDate"]);
                    string description = dataReader["description"].ToString();
                    int pageCount = Convert.ToInt32(dataReader["pageCount"]);
                    string isbn = dataReader["isbn"].ToString();
                    float averageRating = float.Parse(dataReader["averageRating"].ToString());
                    int ratingCount = Convert.ToInt32(dataReader["ratingCount"]);
                    string coverImgUrl = dataReader["coverImgUrl"].ToString();
                    string language = dataReader["language"].ToString();
                    float price = float.Parse(dataReader["price"].ToString());
                    bool digital = Convert.ToBoolean(dataReader["digital"]);
                    string bookIdentifier = dataReader["bookIdentifier"].ToString();
                    string subtitle = dataReader["subtitle"].ToString();
                    string previewLink = dataReader["previewLink"].ToString();
                    string infoLink = dataReader["infoLink"].ToString();
                    string textSnippet = dataReader["textSnippet"].ToString();

                    Book b = new Book(bookId, title, publisher, publishDate, description, pageCount, isbn, averageRating, ratingCount, coverImgUrl, language, price, digital, bookIdentifier, subtitle, previewLink, infoLink, textSnippet);
                    books.Add(b);
                }
                return books;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public List<dynamic> DB_AllBooksCategories()
        {
            List<dynamic> objects = new List<dynamic>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_AllbooksCategory", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    int bookId = Convert.ToInt32(dataReader["id"]);
                    string title = dataReader["title"].ToString();
                    string publisher = dataReader["publisher"].ToString();
                    DateTime publishDate = Convert.ToDateTime(dataReader["publishDate"]);
                    string description = dataReader["description"].ToString();
                    int pageCount = Convert.ToInt32(dataReader["pageCount"]);
                    string isbn = dataReader["isbn"].ToString();
                    float averageRating = float.Parse(dataReader["averageRating"].ToString());
                    int ratingCount = Convert.ToInt32(dataReader["ratingCount"]);
                    string coverImgUrl = dataReader["coverImgUrl"].ToString();
                    string language = dataReader["language"].ToString();
                    float price = float.Parse(dataReader["price"].ToString());
                    bool digital = Convert.ToBoolean(dataReader["digital"]);
                    string bookIdentifier = dataReader["bookIdentifier"].ToString();
                    string subtitle = dataReader["subtitle"].ToString();
                    string previewLink = dataReader["previewLink"].ToString();
                    string infoLink = dataReader["infoLink"].ToString();
                    string textSnippet = dataReader["textSnippet"].ToString();
                    int categoryId = Convert.ToInt32(dataReader["categoryId"]);
                    string categoryName = dataReader["categoryName"].ToString();
                    dynamic b = new
                    {
                        bookId = bookId,
                        title = title,
                        publisher = publisher,
                        publishDate = publishDate,
                        description = description,
                        pageCount = pageCount,
                        isbn = isbn,
                        averageRating = averageRating,
                        ratingCount = ratingCount,
                        coverImgUrl = coverImgUrl,
                        language = language,
                        price = price,
                        digital = digital,
                        bookIdentifier = bookIdentifier,
                        subtitle = subtitle,
                        previewLink = previewLink,
                        infoLink = infoLink,
                        textSnippet = textSnippet,
                        categoryId = categoryId,
                        categoryName = categoryName
                    };
                    objects.Add(b);
                }
                return objects;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }


        public List<dynamic> DB_AllAuthorsAllBooks()
        {
            List<dynamic> objects = new List<dynamic>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_AllAuthorsAllBooks", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    int bookId = Convert.ToInt32(dataReader["id"]);
                    string title = dataReader["title"].ToString();
                    string publisher = dataReader["publisher"].ToString();
                    DateTime publishDate = Convert.ToDateTime(dataReader["publishDate"]);
                    string description = dataReader["description"].ToString();
                    int pageCount = Convert.ToInt32(dataReader["pageCount"]);
                    string isbn = dataReader["isbn"].ToString();
                    float averageRating = float.Parse(dataReader["averageRating"].ToString());
                    int ratingCount = Convert.ToInt32(dataReader["ratingCount"]);
                    string coverImgUrl = dataReader["coverImgUrl"].ToString();
                    string language = dataReader["language"].ToString();
                    float price = float.Parse(dataReader["price"].ToString());
                    bool digital = Convert.ToBoolean(dataReader["digital"]);
                    string bookIdentifier = dataReader["bookIdentifier"].ToString();
                    string subtitle = dataReader["subtitle"].ToString();
                    string previewLink = dataReader["previewLink"].ToString();
                    string infoLink = dataReader["infoLink"].ToString();
                    string textSnippet = dataReader["textSnippet"].ToString();
                    int authorId = Convert.ToInt32(dataReader["authorId"]);
                    string authorName = dataReader["authorName"].ToString();
                    dynamic b = new
                    {
                        bookId = bookId,
                        title = title,
                        publisher = publisher,
                        publishDate = publishDate,
                        description = description,
                        pageCount = pageCount,
                        isbn = isbn,
                        averageRating = averageRating,
                        ratingCount = ratingCount,
                        coverImgUrl = coverImgUrl,
                        language = language,
                        price = price,
                        digital = digital,
                        bookIdentifier = bookIdentifier,
                        subtitle = subtitle,
                        previewLink = previewLink,
                        infoLink = infoLink,
                        textSnippet = textSnippet,
                        authorId = authorId,
                        authorName = authorName
                    };
                    objects.Add(b);
                }
                return objects;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public List<dynamic> DB_authorFromBookId(int id)
        {
            List<dynamic> objects = new List<dynamic>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_authorFromBookId", con, id);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    int authorId = Convert.ToInt32(dataReader["authorId"]);
                    string authorName = dataReader["authorName"].ToString();
                    string authorImg = dataReader["authorImg"].ToString().Substring(1, dataReader["authorImg"].ToString().Length - 2); ;
                    string description = dataReader["description"].ToString();
                    int year = Convert.ToInt32(dataReader["year"]);
                    int bookId = Convert.ToInt32(dataReader["bookId"]);

                    dynamic b = new
                    {
                        authorId = authorId,
                        authorName = authorName,
                        authorImg = authorImg,
                        description = description,
                        year = year,
                        bookId = bookId
                    };
                    objects.Add(b);
                }
                return objects;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public List<dynamic> DB_CategoryFromBookId(int id)
        {
            List<dynamic> objects = new List<dynamic>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_categoryFromBookId", con, id);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    int categoryId = Convert.ToInt32(dataReader["categoryId"]);
                    string categoryName = dataReader["categoryName"].ToString();
                    int bookId = Convert.ToInt32(dataReader["bookId"]);

                    dynamic b = new
                    {
                        categoryId = categoryId,
                        categoryName = categoryName,
                        bookId = bookId
                    };
                    objects.Add(b);
                }
                return objects;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }



        public Object DB_AuthorInfo(int id)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_AuthorInfo", con, id);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                dataReader.Read();

                int authorId = Convert.ToInt32(dataReader["authorId"]);
                string authorName = dataReader["authorName"].ToString();
                string authorImg = dataReader["authorImg"].ToString().Substring(1, dataReader["authorImg"].ToString().Length - 2); ;
                string description = dataReader["description"].ToString();
                int year = Convert.ToInt32(dataReader["year"]);

                dynamic b = new
                {
                    authorId = authorId,
                    authorName = authorName,
                    authorImg = authorImg,
                    description = description,
                    year = year
                };
                return b;

            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }


        public List<Author> DB_AllAuthors()
        {
            List<Author> authors = new List<Author>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_AllAuthors", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    int authorId = Convert.ToInt32(dataReader["authorId"]);
                    string authorName = dataReader["authorName"].ToString();
                    string authorImg = dataReader["authorImg"].ToString().Substring(1, dataReader["authorImg"].ToString().Length - 2); ;
                    string description = dataReader["description"].ToString();
                    int year = Convert.ToInt32(dataReader["year"]);


                    Author a = new Author(authorId, authorName,year,authorImg, description);
                    authors.Add(a);
                }
                return authors;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public List<Category> DB_AllCategories()
        {
            List<Category> categories = new List<Category>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_AllCategories", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    int id = Convert.ToInt32(dataReader["id"]);
                    string name = dataReader["name"].ToString();

                    Category c = new Category(id, name);
                    categories.Add(c);
                }
                return categories;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public List<User> DB_AllUsers()
        {
            List<User> users = new List<User>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_AllUsers", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    string email = dataReader["email"].ToString();
                    string username = dataReader["username"].ToString();
                    string pass = dataReader["pass"].ToString();

                    User u = new User(email, username, pass);
                    users.Add(u);
                }
                return users;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public List<Object> DB_AllUserAllBooksWant()
        {
            List<Object> objects = new List<Object>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_UserAllBooksWant", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    string email = dataReader["email"].ToString();
                    int bookId = Convert.ToInt32(dataReader["bookId"]);


                    Object o = new
                    {
                        email = email,
                        bookId = bookId
                    };
                    objects.Add(o);
                }
                return objects;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public List<Object> DB_AllUserAllBooksRead()
        {
            List<Object> objects = new List<Object>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_UserAllBooksRead", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    string email = dataReader["email"].ToString();
                    int bookId = Convert.ToInt32(dataReader["bookId"]);


                    Object o = new
                    {
                        email = email,
                        bookId = bookId
                    };
                    objects.Add(o);
                }
                return objects;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public int DB_AddBookUserRead(string email, int bookId)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_AddBookUserRead", con, email, bookId);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public int DB_AddBookUserWant(string email, int bookId)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_AddBookUserWant", con, email, bookId);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public int DB_DeleteBookUserRead(string email, int bookId)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_DeleteBookUserRead", con, email, bookId);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }


        public int DB_DeleteBookUserWant(string email, int bookId)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_DeleteBookUserWant", con, email, bookId);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }


        public List<Book> DB_UserAllBooksRead(string email)
        {
            List<Book> books = new List<Book>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_UserBooksRead", con, email);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    int id = Convert.ToInt32(dataReader["id"]);
                    string title = dataReader["title"].ToString();
                    string publisher = dataReader["publisher"].ToString();
                    DateTime publishDate = Convert.ToDateTime(dataReader["publishDate"]);
                    string description = dataReader["description"].ToString();
                    int pageCount = Convert.ToInt32(dataReader["pageCount"]);
                    string isbn = dataReader["isbn"].ToString();
                    float averageRating = float.Parse(dataReader["averageRating"].ToString());
                    int ratingCount = Convert.ToInt32(dataReader["ratingCount"]);
                    string coverImgUrl = dataReader["coverImgUrl"].ToString();
                    string language = dataReader["language"].ToString();
                    float price = float.Parse(dataReader["price"].ToString());
                    bool digital = Convert.ToBoolean(dataReader["digital"]);
                    string bookIdentifier = dataReader["bookIdentifier"].ToString();
                    string subtitle = dataReader["subtitle"].ToString();
                    string previewLink = dataReader["previewLink"].ToString();
                    string infoLink = dataReader["infoLink"].ToString();
                    string textSnippet = dataReader["textSnippet"].ToString();

                    Book b = new Book(id, title, publisher, publishDate, description, pageCount, isbn, averageRating, ratingCount, coverImgUrl, language, price, digital, bookIdentifier, subtitle, previewLink, infoLink, textSnippet);
                    books.Add(b);
                }
                return books;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }


        public List<Book> DB_UserAllBooksWant(string email)
        {
            List<Book> books = new List<Book>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_UserBooksWant", con, email);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    int id = Convert.ToInt32(dataReader["id"]);
                    string title = dataReader["title"].ToString();
                    string publisher = dataReader["publisher"].ToString();
                    DateTime publishDate = Convert.ToDateTime(dataReader["publishDate"]);
                    string description = dataReader["description"].ToString();
                    int pageCount = Convert.ToInt32(dataReader["pageCount"]);
                    string isbn = dataReader["isbn"].ToString();
                    float averageRating = float.Parse(dataReader["averageRating"].ToString());
                    int ratingCount = Convert.ToInt32(dataReader["ratingCount"]);
                    string coverImgUrl = dataReader["coverImgUrl"].ToString();
                    string language = dataReader["language"].ToString();
                    float price = float.Parse(dataReader["price"].ToString());
                    bool digital = Convert.ToBoolean(dataReader["digital"]);
                    string bookIdentifier = dataReader["bookIdentifier"].ToString();
                    string subtitle = dataReader["subtitle"].ToString();
                    string previewLink = dataReader["previewLink"].ToString();
                    string infoLink = dataReader["infoLink"].ToString();
                    string textSnippet = dataReader["textSnippet"].ToString();

                    Book b = new Book(id, title, publisher, publishDate, description, pageCount, isbn, averageRating, ratingCount, coverImgUrl, language, price, digital, bookIdentifier, subtitle, previewLink, infoLink, textSnippet);
                    books.Add(b);
                }
                return books;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }


        public int DB_AddUser(string email, string username, string pass)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_InsertUser", con, email, username, pass);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public List<Book> DB_AllBooksOfAuthor(int authorId)
        {
            List<Book> books = new List<Book>();
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommandWithStoredProcedure("sp_AllBooksOfAuthor", con, authorId);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dataReader.Read())
                {
                    int id = Convert.ToInt32(dataReader["id"]);
                    string title = dataReader["title"].ToString();
                    string publisher = dataReader["publisher"].ToString();
                    DateTime publishDate = Convert.ToDateTime(dataReader["publishDate"]);
                    string description = dataReader["description"].ToString();
                    int pageCount = Convert.ToInt32(dataReader["pageCount"]);
                    string isbn = dataReader["isbn"].ToString();
                    float averageRating = float.Parse(dataReader["averageRating"].ToString());
                    int ratingCount = Convert.ToInt32(dataReader["ratingCount"]);
                    string coverImgUrl = dataReader["coverImgUrl"].ToString();
                    string language = dataReader["language"].ToString();
                    float price = float.Parse(dataReader["price"].ToString());
                    bool digital = Convert.ToBoolean(dataReader["digital"]);
                    string bookIdentifier = dataReader["bookIdentifier"].ToString();
                    string subtitle = dataReader["subtitle"].ToString();
                    string previewLink = dataReader["previewLink"].ToString();
                    string infoLink = dataReader["infoLink"].ToString();
                    string textSnippet = dataReader["textSnippet"].ToString();

                    Book b = new Book(id, title, publisher, publishDate, description, pageCount, isbn, averageRating, ratingCount, coverImgUrl, language, price, digital, bookIdentifier, subtitle, previewLink, infoLink, textSnippet);
                    books.Add(b);
                }
                return books;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }




        //---------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure
        //---------------------------------------------------------------------------------
        private SqlCommand CreateCommandWithStoredProcedure(String spName, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }


        private SqlCommand CreateCommandWithStoredProcedure(String spName, SqlConnection con, string email)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            switch (spName)
            {

                case "sp_UserBooksRead":
                    cmd.Parameters.AddWithValue("@userEmail", email);
                    break;
                case "sp_UserBooksWant":
                    cmd.Parameters.AddWithValue("@userEmail", email);
                    break;
                default:
                    break;
            }
            return cmd;
        }

        private SqlCommand CreateCommandWithStoredProcedure(String spName, SqlConnection con, int id)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            switch (spName)
            {

                case "sp_AllBooksOfAuthor":
                    cmd.Parameters.AddWithValue("@authorId", id);
                    break;
                case "sp_AuthorInfo":
                    cmd.Parameters.AddWithValue("@authorId", id);
                    break;
                case "sp_authorFromBookId":
                    cmd.Parameters.AddWithValue("@bookId", id);
                    break;
                case "sp_categoryFromBookId":
                    cmd.Parameters.AddWithValue("@bookId", id);
                    break;
                default:
                    break;
            }
            return cmd;
        }



        private SqlCommand CreateCommandWithStoredProcedure(String spName, SqlConnection con, string email, int bookId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            switch (spName)
            {
                case "sp_AddBookUserRead":
                    cmd.Parameters.AddWithValue("@userEmail", email);
                    cmd.Parameters.AddWithValue("@bookId", bookId);
                    break;
                case "sp_AddBookUserWant":
                    cmd.Parameters.AddWithValue("@userEmail", email);
                    cmd.Parameters.AddWithValue("@bookId", bookId);
                    break;
                default:
                    cmd.Parameters.AddWithValue("@userEmail", email);
                    cmd.Parameters.AddWithValue("@bookId", bookId);
                    break;
            }
            return cmd;
        }


        private SqlCommand CreateCommandWithStoredProcedure(String spName, SqlConnection con, string email, string username, string pass)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            switch (spName)
            {

                case "sp_InsertUser":
                    cmd.Parameters.AddWithValue("@userEmail", email);
                    cmd.Parameters.AddWithValue("@username", username);
                    cmd.Parameters.AddWithValue("@pass", pass);
                    break;
                default:
                    break;
            }
            return cmd;
        }
    }
}
