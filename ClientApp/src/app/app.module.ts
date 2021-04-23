import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// components

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignoutComponent } from './components/signout/signout.component';
import { CitiesComponent } from './components/cities/cities.component';
import { TheaterComponent } from './components/theater/theater.component';
import { MovieComponent } from './components/movie/movie.component';
import { SeatbookingComponent } from './components/seatbooking/seatbooking.component';
import { TicketComponent } from './components/ticket/ticket.component';


// auth guard
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CitiesComponent,
    SignoutComponent,
    SignupComponent,
    SigninComponent,
    TheaterComponent,
    MovieComponent,
    SeatbookingComponent,
    TicketComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'signout', component: SignoutComponent },
      { path: 'cities', component: CitiesComponent, canActivate: [AuthGuard] },
      { path: 'theaters/:cityId', component: TheaterComponent, canActivate: [AuthGuard] },
      { path: 'movies', component: MovieComponent, canActivate: [AuthGuard] },
      { path: 'seatbooking', component: SeatbookingComponent, canActivate: [AuthGuard] },
      { path: 'mymovietickets', component: TicketComponent, canActivate: [AuthGuard] },
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
