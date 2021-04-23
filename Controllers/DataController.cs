using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PetaPoco;
//using Pomelo.Data.MySql;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using bookmyshow.services;

using bookmyshow.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace bookmyshow.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        private readonly IDataService _dataService;
        public DataController(IDataService dataService) {
            this._dataService = dataService;
        }



        [HttpPost]
        [Route("booktickets")]
        //public async Task<JsonResult> BookTicket([FromBody] int showId = 0, [FromBody] string email ="mail@mail.com", [FromBody] int cost = 0, [FromBody] dynamic seats = null )
        public async Task<JsonResult> BookTicket([FromBody] dynamic body)
        {


            Console.WriteLine(body.GetType() );
           
            Console.WriteLine(body.GetProperty("showId").GetType() +  body.GetProperty("seats").ToString());
            
            var data = new String[4];
            //var tdata = this._dataService.BookTicket(body["showId"] ,  body["email"] , body["cost"] , body["seats"]);
            
            var tdata =  await this._dataService.BookTicket( body.GetProperty("showId").ToString() , body.GetProperty("email").ToString(), body.GetProperty("cost").ToString() ,  body.GetProperty("seats").ToString());
            Console.WriteLine(tdata);
            return new JsonResult(tdata);

        }

        [HttpPost]
        [Route("signup")]
        public async Task<JsonResult> SignUp([FromBody] dynamic body)
        {

            string response = await this._dataService.SignUp(body.GetProperty("email").ToString() , body.GetProperty("phoneNumber").ToString() , body.GetProperty("password").ToString() , body.GetProperty("personName").ToString() );
            Console.WriteLine(response);
            return new JsonResult( response);
        }

        [HttpPost]
        [Route("signin")]
        public async Task<JsonResult> SignIn([FromBody] dynamic body)
        {

            string response = await this._dataService.SignIn(body.GetProperty("email").ToString(), body.GetProperty("password").ToString());
            Console.WriteLine(response);
            return new JsonResult(response);
        }

        [HttpPost]
        [Route("gettickets")]
        public async Task<JsonResult> GetTickets([FromBody] dynamic body)
        {
            var response = await this._dataService.GetTickets(body.GetProperty("email").ToString());
            Console.WriteLine(response);
            return new JsonResult(response);
        }

        [HttpPost]
        [Route("cancelticket")]
        public async Task<JsonResult> CancelTicket([FromBody] dynamic body)
        {
            var response = await this._dataService.CancelTicket(body.GetProperty("showId").ToString() , body.GetProperty("seats").ToString()  , body.GetProperty("ticketId").ToString() );
            return new JsonResult(response);
        }

        [HttpGet]
        [Route("cities")]
        public async Task<IEnumerable<City>> GetCities()
        {           
            List<City> cities = new List<City>();
            cities = await this._dataService.GetAllCities();

            return cities;
        }

        [HttpGet("{cityId}")]
        [Route("theaters")]
        public async Task<IEnumerable<Theater>> GetTheaters(int cityId)
        {
            // TODO
            Console.WriteLine(" theater is called");
            //string k = @"SELECT * FROM [myshowDB].[dbo].[theater] where cityId = " + cityId.ToString() + @";";
            //Console.WriteLine(k);
            List<Theater> theaters = new List<Theater>();
            theaters = await this._dataService.GetTheatersInCity(cityId);

            return theaters;

        }


        [HttpGet("{theaterId}")]
        [Route("movies")]
        public async Task<JsonResult> AllMoviesInATheater(int theaterId)
        {
            //var t = new string[] { };
            //Dictionary<string, dynamic> data = new Dictionary<string, dynamic>();

            //Console.WriteLine(data["movies"][0]["poster"]);
           var data = await this._dataService.GetMoviesInTheater(theaterId);
            return new JsonResult(data);
        }


        [HttpGet("{showId}")]
        [Route("seats")]
        public async Task<IEnumerable<Seats>> AllSeats(int showId)
        {
            List<Seats> seats = new List<Seats>();

            seats = await this._dataService.GetSeatsByShowId(showId);
            return seats;

        }

        [HttpGet("{movieId}")]
        [Route("movie")]
        public async Task<JsonResult> GetMovie(int movieId)
        {
            

            var data = await this._dataService.GetMovie(movieId);
            return  new JsonResult(data);

        }

        



    }
}
