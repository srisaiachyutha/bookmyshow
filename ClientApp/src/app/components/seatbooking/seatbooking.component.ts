import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { DataService } from '../../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-seatbooking',
  templateUrl: './seatbooking.component.html',
  styleUrls: ['./seatbooking.component.css']
})
export class SeatbookingComponent implements OnInit {

  movieId: number;
  showId: number;
   bookedSeats = new Array(30);
   seats: any[];
   image: SafeStyle;
  selectedSeats: number[] = [];
  cost: number = 0;

  constructor(private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private auth: AuthService) { }

  ngOnInit() {

    this.movieId = parseInt(this.route.snapshot.paramMap.get('movieId'));
    this.showId = parseInt(this.route.snapshot.paramMap.get('showId'));


    this.loadData();
    

  }

  handle(index, seat) {
    let row = 0;
    let col = 0;
    let seatNo = seat.seatNo - 1;

    row = Math.floor(seatNo / 10);
    col = seatNo % 10;

    console.log(row, col);

    if (this.bookedSeats[seat.seatNo - 1] == 'null') {
      this.selectedSeats.push(seat.seatNo);
      this.cost += seat.cost;

      this.seats[row][col].booked = 'false';
      this.bookedSeats[seat.seatNo - 1] = 'false';
    } else if (this.bookedSeats[seat.seatNo - 1] == 'false') {

      this.selectedSeats.splice(this.selectedSeats.indexOf(seat.seatNo), 1);
      this.cost -= seat.cost;

      this.seats[row][col].booked = 'null';
      this.bookedSeats[seat.seatNo - 1] = 'null';
    }

    //this.seats = this.seats;
  }

  listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }

      matrix[k].push(list[i]);
    }

    return matrix;
  }

  loadData() {

    this.data.fetchSeats(this.showId)
      .subscribe(result => {
        for (let r of result) {
          //if (r.seatNo == 2)
          //  this.bookedSeats[r.seatNo - 1] = 'true';
          //else

          this.bookedSeats[r.seatNo - 1] = r.booked;
        }

        this.seats = this.listToMatrix(result, 10);
        console.log(this.seats);
      }, error => console.error(error));

    this.data.fetchMovie(this.movieId)
      .subscribe(result => {

        let data = result["poster"];
        let objectURL = 'data:image/jpeg;base64,' + data;

        this.image = this.sanitizer.bypassSecurityTrustStyle('url(' + objectURL + ')');

      }, error => console.error(error));


  }


  bookTickets() {
    let email = localStorage.getItem('email');

    this.auth.getEmail().subscribe(result => email = result);

    this.data.bookTickets(this.selectedSeats, this.showId, email, this.cost)
      .subscribe(result => {
        console.log(result);
        this.loadData();
        this.cost = 0;
        this.selectedSeats = [];
      }, error => {
          console.log(error);
      });

  }


}
