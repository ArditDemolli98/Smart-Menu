using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using Microsoft.AspNetCore.Hosting;
namespace WebApi.Controllers.MenuControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public ProductController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select ProductID
                    ,ProductName
                    ,CategoryID
                    ,ProductDescription
                    ,Price
                    ,PhotoFileName
                    from dbo.Products
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

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(Models.Menu.Product prod)
        {
            string query = @"
                    insert into dbo.Products 
                    (ProductName,CategoryID,ProductDescription,Price,PhotoFileName)
                    values 
                    (
                    '" + prod.ProductName + @"'
                    ,'" + prod.CategoryID + @"'
                    ,'" + prod.ProductDescription + @"'
                    ,'" + prod.ProductPrice + @"'
                    ,'" + prod.PhotoFileName + @"'
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
        public JsonResult Put(Models.Menu.Product prod)
        {
            string query = @"
                    update dbo.Products set 
                    ProductName = '" + prod.ProductName + @"'
                    ,CategoryID = '" + prod.CategoryID + @"'
                    ,ProductDescription = '" + prod.ProductDescription + @"'
                    ,Price = '" + prod.ProductPrice + @"'

                    where ProductID = " + prod.ProductID + @" 
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

            return new JsonResult(prod);
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Products
                    where ProductID = " + id + @" 
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


        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }


        [Route("GetAllCategoryNames")]
        public JsonResult GetAllCategoryNames()
        {
            string query = @"
                    select CategoryName from dbo.Categories
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

            return new JsonResult(table);
        }
    }
}
