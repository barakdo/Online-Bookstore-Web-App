using Server.Controllers;
using Server.DAL;

namespace Server.BL
{
    public class Category
    {
        private int id;
        private string name;

        public Category(int id, string name)
        {
            this.id = id;
            this.name = name;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }

        public static List<Category> GetAllCategories()
        {
            DBservices db = new DBservices();
            return db.DB_AllCategories();
        }

        public static List<Object> GetAllCategoriesBooks(int cId)
        {
            DBservices db = new DBservices();
            List<dynamic> catBook = db.DB_AllBooksCategories();
            List<Object> returnList = new List<Object>();
            foreach (dynamic cB in catBook)
            {
                if (cId == cB.categoryId)
                {
                    returnList.Add(cB);
                }
            }
            return returnList;
        }

        public static List<Object> GetAllCategoriesImages()
        {
            DBservices db = new DBservices();
            List<dynamic> catBook = db.DB_AllBooksCategories();
            List<Object> returnList = new List<Object>();
            List<String> strList = new List<String>();
            foreach (dynamic cB in catBook)
            {
                if (!strList.Contains(cB.categoryName) && cB.coverImgUrl != "" && !strList.Contains(cB.title))
                {
                    returnList.Add(cB);
                    strList.Add(cB.categoryName);
                    strList.Add(cB.title);
                }
            }
            return returnList;
        }


        public static List<Object> GetAllBooksCategory()
        {
            DBservices db = new DBservices();
            return db.DB_AllBooksCategories();
        }
    }
}
