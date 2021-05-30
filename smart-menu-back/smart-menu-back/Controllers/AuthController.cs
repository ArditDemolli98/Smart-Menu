using Microsoft.AspNetCore.Mvc;
using smart_menu_back.Data;
using smart_menu_back.Dtos__data_transfer_objects_;
using smart_menu_back.Helpers;
using smart_menu_back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace smart_menu_back.Controllers
{
    [Route(template:"api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JWTService _jwtService;
        public AuthController(IUserRepository repository, JWTService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;

        }
        [HttpPost(template:"register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)

            };

            return Created("success", _repository.Create(user));
        }

        [HttpPost(template:"login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new { message = "Invalid Credentials"});

            if(!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new Microsoft.AspNetCore.Http.CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new { 
                message = "success"
            });
        }


        [HttpGet(template: "user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);

                return Ok(user);
            }
            catch(Exception e)
            {
                return Unauthorized();
            }
        }
        [HttpPost(template:"Logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "success"
            });
        }
    }
}
