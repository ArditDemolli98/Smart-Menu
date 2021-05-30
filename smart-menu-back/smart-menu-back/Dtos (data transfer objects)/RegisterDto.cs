using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace smart_menu_back.Dtos__data_transfer_objects_
{
    //contains what data we send from frontend
    public class RegisterDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
