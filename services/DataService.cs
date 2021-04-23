using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using bookmyshow.models;
using PetaPoco;
using System.Linq;
//using Pomelo.Data.MySql;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;

namespace bookmyshow.services
{
    public class DataService : IDataService
    {

        private static string _connStr = @"
                    Server=127.0.0.1,1433;
                    User Id=SA;
                        Database=myshowDB;
                    Password=Kurnool*23
                                        ";

        public async Task<List<City>> GetAllCities() {

            List<City> cities = new List<City>();
            return await Task.Run(() =>
            {
                var con = new SqlConnection(_connStr);
                var db = new Database(con, null);
                con.Open();
                
                foreach (City city in db.Query<City>(@"SELECT * FROM [myshowDB].[dbo].[city];"))
                {
                    cities.Add(city);
                   
                }

                con.Close();
                return cities;
            });

        }

        public async Task<dynamic> GetTickets(string email)
        {
            List<Ticket> tickets = new List<Ticket>();

            List<dynamic> ticketInfo = new List<dynamic>();

            
            await Task.Run(() => {

                var con = new SqlConnection(_connStr);
                var db = new Database(con, null);
                con.Open();

                foreach(dynamic d in db.Query<dynamic>(@" select t.ticketId, t.cost,t.email,t.showId, t.info , m.movieName  from
                  [myshowDB].[dbo].[ticket] as t  inner join [myshowDB].[dbo].[show] as s on s.showId = t.showId
                inner join [myshowDB].[dbo].[movie] as m on m.movieId = s.movieId where t.email like @0
                " , email)) {

                    ticketInfo.Add(

                        new Dictionary<string, dynamic>()
                        {
                            {"movieName" , d.movieName },
                            {"ticketId" , d.ticketId } ,
                            {"cost" , d.cost } ,
                            {"showId" , d.showId},
                            {"info" , d.info }
                        }

                        );

                   
                }
             
                con.Close();
                
                return ticketInfo;
            });
            return ticketInfo;
        }

        public async Task<string> SignIn(string email, string password)
        {
            string response = "";
            return await Task.Run(() =>
            {
                var con = new SqlConnection(_connStr);
                var db = new Database(con, null);
                con.Open();

                foreach (int a in db.Query<int>(@" select count(*) as a from [myshowDB].[dbo].[person] where email like @0 and
                  password like @1  ;",

                   email , password
                   )) {
                    if(a == 1 || a > 1) {
                        response = "success";
                    }
                    else
                    {
                        response = "failure";
                    }
                }

                    con.Close();
                return response;
            });
        }

        public async Task<dynamic> BookTicket(string showId, string email, string cost, string seats)
        {

            return await Task.Run(() =>
            {
                var con = new SqlConnection(_connStr);
                var db = new Database(con, null);
                con.Open();
                string temp = seats;
                string s = seats.Remove(seats.Length - 1, 1);
                s = s.Substring(1);

                
                var count = s.Count(x => x == ',') + 1;
                int c =0;

                foreach (int a in db.Query<int>(@" select count(*) as a from [myshowDB].[dbo].[seat] where showId=" +

                    showId + @"and seatNo in (   " + s + @") and booked is null;"
                    )) {

                    c = a;
                   
                }

                if(count == c)
                {
                    db.Execute(@" update [myshowDB].[dbo].[seat] set [booked] = 1  where showId = " + showId
                    + @" and seatNo in ( " + s + @");");
                    
                    Ticket ticket = new Ticket {

                        email = email ,
                        showId = Int32.Parse(showId),
                        cost = Int32.Parse(cost),
                        info =  @" { seats: " + temp + @" } ",
                    };

                var ticketId =  db.Insert("[myshowDB].[dbo].[ticket]", ticket);
                    
                    return ticketId.ToString();
                    
                }


                con.Close();
                return "";
            });

            

            
        }

        public async Task<string> SignUp(string email, string phoneNumber, string password, string personName) {

            string response ="";

            await Task.Run(() => {

                var con = new SqlConnection(_connStr);
                var db = new Database(con, null);
                con.Open();

                int c = 0;
                foreach (int a in db.Query<int>(@" select count(*) as a from [myshowDB].[dbo].[person] where email like @0;" ,

                   email 
                   ))
                {

                    c = a;
                    
                }
                if(c >= 1)
                {
                    con.Close();

                    response = "email is already present";
                }
                else
                {
                    Person person = new Person
                    {
                        email = email,
                        phoneNumber = phoneNumber ,
                        personName = personName ,
                        password = password

                    };

                    db.Insert("[myshowDB].[dbo].[person]" , person );

                    con.Close();

                   response = "successfully created person";
                }

                
                
            });


            return response;
        }

        public async Task<List<Theater>> GetTheatersInCity(int cityId)
        {

            List<Theater> theaters = new List<Theater>();


            await Task.Run(() => {

                var con = new SqlConnection(_connStr);
                var db = new Database(con, null);
                con.Open();
                foreach (Theater theater in db.Query<Theater>(@"SELECT * FROM [myshowDB].[dbo].[theater] where cityId = " + cityId.ToString() + @";"))
                {
                    theaters.Add(theater);
                    
                }
                con.Close();
                return theaters;
            });


            return theaters;
        }

        public async Task<dynamic> GetMovie(int movieId)
        {
            Dictionary<string, dynamic> data = new Dictionary<string, dynamic>();
            await Task.Run(() => {

                var con = new SqlConnection(_connStr);
                var db = new Database(con, null);
                con.Open();

                foreach (dynamic d in db.Query<dynamic>(@"
                    select   poster from
                    [myshowDB].[dbo].[movie] where movieId in (" + movieId.ToString() + @");"

                ))
                {
                    data["poster"] = d.poster;
                   
                }
                con.Close();

                return data;
            });
            return data;
        }

        public async Task<dynamic> GetMoviesInTheater(int theaterId)
        {
            Dictionary<string, dynamic> data = new Dictionary<string, dynamic>();
            data["movies"] = new List<dynamic> { };
            data["timings"] = new List<dynamic> { };
            await Task.Run(() => {

                var con = new SqlConnection(_connStr);
                var db = new Database(con, null);
                con.Open();

                db.Execute(@" SELECT movieId , showId , screenId ,timeStart , showDate into #temp from [myshowDB].[dbo].[show]  WHERE
                screenId in ( select screenId from [myshowDB].[dbo].[screen] 
                    where theaterId = " + theaterId.ToString() + @"
                    ); ");

                foreach (dynamic d in db.Query<dynamic>(@"
                    select   movieId , movieName , duration,poster from
                    [myshowDB].[dbo].[movie] where movieId in 
                (select distinct(movieId)
                    from #temp);
                "))
                
                {
                    //Console.WriteLine(d.poster);
                    data["movies"].Add(
                        new Dictionary<string, dynamic>()
                        {
                            {"movieId" ,d.movieId },
                            {"movieName" , d.movieName } ,
                            {"duration" , d.duration } ,
                            {"poster" , d.poster }
                        }

                        );
                }

                foreach (dynamic d in db.Query<dynamic>(@"
                    select movieId , showId ,timeStart ,showDate from #temp;"))
               
                {
                    data["timings"].Add(
                        new Dictionary<string, dynamic>()
                        {
                            {"movieId" ,d.movieId },
                            {"showId" , d.showId },
                            {"timeStart" , d.timeStart },
                            {"showDate" , d.showDate }
                        }

                        );
                }

                db.Execute("truncate table [myshowDB].[dbo].#temp; ");


                con.Close();

                return data;
            });
            return data;
        }

        public async Task<List<Seats>> GetSeatsByShowId(int showId)
        {
            List<Seats> seats = new List<Seats>();

            await Task.Run(() => {

                var con = new SqlConnection(_connStr);
                var db = new Database(con, null);
                con.Open();

                
                foreach (Seats seat in db.Query<Seats>(@"
                select showId , seatNo , (case when booked is null
                    then 'null'
                     when booked=1 then 'true' when booked=0 then 'false' 
                        end) as booked , cost
                from [myshowDB].[dbo].[seat] where showId =" + showId.ToString() + @";
                "))
                {
                    seats.Add(seat);

                }

                con.Close();
            });
            return seats;
        }

        public async Task<dynamic> CancelTicket(string seatId, string seats , string ticketId)
        {

            return await Task.Run(() =>
            {
                var con = new SqlConnection(_connStr);
                var db = new Database(con, null);
                con.Open();
                

                db.Execute(@" update [myshowDB].[dbo].[seat] set booked = null where seatNo in ("+seats + @") ;" );
                
                db.Delete(" [myshowDB].[dbo].[ticket] " , "ticketId",new Ticket { ticketId = Int32.Parse(ticketId) });
                con.Close();

                return "successfully deleted ticket";
            });

            return "";
        }
    }
}
