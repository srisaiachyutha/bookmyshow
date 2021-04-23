using System;
namespace bookmyshow.models
{
    public class Seats
    {
        public int showId { get; set; }
        public int seatNo { get; set; }
        public string booked { get; set; }
        public int cost { get; set; }
    }
}
