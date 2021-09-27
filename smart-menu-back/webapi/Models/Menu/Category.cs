using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Menu
{
    public class Category
    {
        public int CategoryID { get; set; }
        public int UserID { get; set; }
        public string CategoryName { get; set; }
    }
}
