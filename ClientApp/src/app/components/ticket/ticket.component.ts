import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  tickets: any;
  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit() {

    this.loadTicketData();
  }

  loadTicketData() {
    let email: string;
    this.auth.getEmail().subscribe(result => email = result);
    let body = {
      email: email
    };
    this.data.getTickets(body)
      .subscribe(result => { this.tickets = result; console.log(result); }, error => console.log(error));
  }

  cancelTicket(ticketInfo: any) {

    let s = ticketInfo.info;
    console.log(s.substring(s.indexOf("[") + 1, s.indexOf("]")));
    let body = {
      showId: ticketInfo.showId,
      seats: s.substring(s.indexOf("[") + 1, s.indexOf("]")),
      ticketId: ticketInfo.ticketId
    }

    this.data.cancelTicket(body)
      .subscribe(result => {
        console.log(result);
        this.loadTicketData();
      }, error => console.log(error));

    
    //console.log(JSON.parse(ticketInfo.info));
    
      
  }

}
