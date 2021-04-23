import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import {  Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities : City[];

  constructor(private data: DataService, private router: Router, private http: HttpClient, @Inject('BASE_URL') baseUrl: string,) {

    //http.get<City[]>(baseUrl + 'api/data/cities').subscribe(result => {
    //  this.cities = result;
    //}, error => console.error(error));

     this.data.fetchCities().subscribe(result => {
      this.cities = result;
    }, error => console.error(error));
  }

  ngOnInit(): void {

    

  }

  handleCity(city: any) {

    this.router.navigate(['/theaters' , city.cityId]);
  }

}


interface City {
  cityId: number;
  cityName: string;
}