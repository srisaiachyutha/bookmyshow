import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { DataService } from '../../services/data.service';
import { Theater } from '../../../models/Theater';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {

  cityId: number;
  theaters: Theater[];

  constructor(private data: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.cityId = parseInt(params.get('cityId'));

      this.data.fetchTheaters(this.cityId)
              .subscribe(result => {
            this.theaters = result;
            //console.log(result);
          }, error => console.error(error));
    });
  }

  handleTheater(theater: Theater) {

    this.router.navigate(['/movies', { theaterName: theater.theaterName, theaterId: theater.theaterId }]);
  }

}


