import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let url: string = state.url;

    return this.checkLogin(url);


  }
  constructor(private auth: AuthService, private router: Router) { }

  checkLogin(url: string): true | UrlTree {
    console.log("Url: " + url)
    let val = localStorage.getItem('loggedIn');
    //let email = '';
    //this.auth.getEmail().subscribe(email => email = email);


    //console.log(email + "  is");
    //if (email != null && email !== '') {
    //  console.log("i am called in email");
      
    //  if (url == '/signin')
    //    this.router.parseUrl('/');
    //  else
    //    return true;
    //} else {
    //  return this.router.parseUrl('/signin');
    //}

    if (val != null && val == "true") {
      if (url == "/signin")
        this.router.parseUrl('/');
      else
        return true;
    } else {
      return this.router.parseUrl('/signin');
    }
    return true;
  }


}
