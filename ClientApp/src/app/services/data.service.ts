import { Injectable } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { City } from '../../models/City';
import { Theater } from '../../models/Theater';
import { Seats } from '../../models/Seats';

//imports for providing and converting data
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _baseUrl: any;
  public cities: City[];

  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private sanitizer: DomSanitizer) {
    this._baseUrl = baseUrl;
  }

  fetchTheaters(cityId: number) {
    
   return  this.http.get<Theater[]>(this._baseUrl + 'api/data/theaters?cityId=' + cityId.toString());   
  }

  fetchCities() {
    return this.http.get<City[]>(this._baseUrl + 'api/data/cities');
  }  

  fetchMoviesInTheater( theaterId : number ) {
    return this.http.get<Theater[]>(this._baseUrl + 'api/data/movies?theaterId=' + theaterId.toString());
  }

  fetchSeats(showId: number) {
    return this.http.get<Seats[]>(this._baseUrl + 'api/data/seats?showId=' + showId.toString());
  }

  fetchMovie(movieId: number) {
    return this.http.get<any>(this._baseUrl + 'api/data/movie?movieId=' + movieId.toString());
  }

  bookTickets(seats: number[], showId: number, email: string, cost: number) {

    const body = {

      showId: showId,
      seats: seats,
      email: email,
      cost: cost

    };
    

    return this.http.post<any>(this._baseUrl + 'api/data/booktickets',body);

  }

  getTickets(body) {
    return this.http.post<any>(this._baseUrl + 'api/data/gettickets', body);
  }

  cancelTicket(body) {
    return this.http.post<any>(this._baseUrl + 'api/data/cancelticket', body);
  }

}


