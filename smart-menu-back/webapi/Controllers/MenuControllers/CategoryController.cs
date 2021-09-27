using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebApi.Models.Menu;

namespace WebApi.Controllers.MenuControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly IConfiguration _configuration;

        public CategoryController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select CategoryID, CategoryName from dbo.Categories";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(Category cat)
        {
            string query = @"
                    insert into dbo.Categories
                    (CategoryName, UserID)
                    values 
                    ('" + cat.CategoryName + @"'
                    ,'"+ cat.UserID+@"'
                    )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Models.Menu.Category cat)
        {
            string query = @"
                    update dbo.Categories set 
                    CategoryName = '" + cat.CategoryName + @"'
                    where CategoryID = " + cat.CategoryID + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Categories
                    where CategoryID = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Default");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
