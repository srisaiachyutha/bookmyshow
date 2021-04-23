import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private auth: AuthService,
          private router: Router  ) { }

  ngOnInit(): void {
  }

  signout() {
    this.auth.logout();
    this.router.navigate(['/signin']);
  }

}
