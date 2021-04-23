using System;
namespace bookmyshow.models
{
    public class Ticket
    {
        public int ticketId { get; set; }
        public int  cost { get; set; }
        public string email { get; set; }
        public int  showId { get; set; }
        public string info { get; set; }

    }
}
