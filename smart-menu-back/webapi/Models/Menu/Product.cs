using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Menu
{
    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int CategoryID { get; set; }
        public string ProductDescription { get; set; }
        public double ProductPrice { get; set; }
        public string PhotoFileName { get; set; }

    }
}
