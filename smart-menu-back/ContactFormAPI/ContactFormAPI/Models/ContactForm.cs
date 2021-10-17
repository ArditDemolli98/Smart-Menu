using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactFormAPI.Models
{
    public class ContactForm
    {
        public int CF_ID { get; set; }
        public string CF_FirstName { get; set; }
        public string CF_LastName { get; set; }
        public string CF_Email { get; set; }

        public string CF_SecondEmail { get; set; }
        public string CF_Subject { get; set; }
        public string CF_Message { get; set; }

    }
}
