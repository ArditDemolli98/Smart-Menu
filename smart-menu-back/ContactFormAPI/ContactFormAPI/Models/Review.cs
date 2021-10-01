using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactFormAPI.Models
{
    public class Review
    {
        public int ReviewID { get; set; }
        public string ReviewName { get; set; }
        public string ReviewRating { get; set; }
        public string ReviewMessage { get; set; }
    }
}
