import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../../services/auth.service';

import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private data: DataService,
    private router: Router,
    private auth: AuthService) {
    this.signinForm = this.buildContactForm();
  }

  ngOnInit(): void {
    this.signinForm = this.buildContactForm();
  }

  onsignup() {

  let singUpData = {
      email: this.signinForm.get('email').value,
      password: this.signinForm.get('password').value,
      phoneNumber: this.signinForm.get('mobile').value,
      personName: this.signinForm.get('personname').value
    }


    this.auth.signUp(singUpData)
      .subscribe(result => {
        
        //console.log(result);
        if (result === "email is already present") {
          alert("this email is already present");
        }
        if (result === "successfully created person") {
          alert("user created successfully");

          this.router.navigate(["/signin"]);
        }

      }, error => {
          //console.log(error["error"]["text"]);
          //if (error['text'] === "email is already present") {
          //  console.log("error email is already present");
          //  alert("email is already present");
          //} else if (error['text'] === "successfully created person") {
          //  console.log("error succesfully created");
          //  this.router.navigate(["/signin"]);
          //}
          console.error(error);
        }

        );

  }

  buildContactForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
      personname: new FormControl('', [Validators.required])
    });
  }
}
