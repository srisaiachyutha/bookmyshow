import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { DataService } from '../../services/data.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  theaterId: number;
  theaterName: string;
  moviesData: [string, any][];

  constructor(private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer  ) { }

  ngOnInit() {

    this.theaterId = parseInt(this.route.snapshot.paramMap.get('theaterId'));
    this.theaterName = this.route.snapshot.paramMap.get('theaterName');
    
    //console.log(this.theaterId, this.theaterName);

    this.data.fetchMoviesInTheater(this.theaterId)
      .subscribe(result => {
        //console.log(result['movies']);

        let d = {};
        for (let i = 0; i < result['movies'].length; i++) {

          result['movies'][i]['poster'] = this.convertStringToPicture( result['movies'][i]['poster'] );
          d[result['movies'][i].movieId] = {'movie':result['movies'][i] , 'timings':[] }
        }
        //console.log(this.moviesData);

        for (let i = 0; i < result['timings'].length; i++) {
          d[result['timings'][i].movieId]['timings'].push(result['timings'][i]); 
        }

        this.moviesData = Object.entries(d);

        //this.moviesData = result;
        console.log(this.moviesData);
      }, error => console.error(error));
  }


  convertStringToPicture(data) {

    let objectURL = 'data:image/jpeg;base64,' + data;
          //this.sanitizer.
      return  this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  handleTimings(timing) {

    this.router.navigate(['seatbooking', { showId: timing.showId , movieId : timing.movieId } ]);
  }
}
