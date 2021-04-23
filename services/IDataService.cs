using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using bookmyshow.models;
namespace bookmyshow.services
{
    public interface IDataService
    {
        public Task<List<City>> GetAllCities();

        public Task<List<Theater>> GetTheatersInCity(int cityId);

        public Task<dynamic> GetMoviesInTheater(int theaterId);

        public Task<List<Seats>> GetSeatsByShowId(int showId);

        public  Task<dynamic> GetMovie(int movieId);

        public Task<dynamic> BookTicket(string showId , string email , string cost , string seats);

        public Task<string> SignUp(string email , string password , string phoneNumber , string personName);

        public Task<string> SignIn(string email, string password);

        public Task<dynamic> GetTickets(string email);

        public Task<dynamic> CancelTicket(string seatId , string seats , string ticketId);
    }
}
