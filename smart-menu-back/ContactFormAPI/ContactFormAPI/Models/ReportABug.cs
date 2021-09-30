using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactFormAPI.Models
{
    public class ReportABug
    {
        public int ReportID { get; set; }
        public string ReportName { get; set; }

        public string ReportBugType { get; set; }
        public string ReportDescription { get; set; }
    }
}
