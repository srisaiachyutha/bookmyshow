import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  constructor(private auth: AuthService,
    private router: Router,
    private data: DataService) {
    this.signinForm = this.buildContactForm();
  }

  ngOnInit(): void {


    this.signinForm = this.buildContactForm();
  }

  onSubmit() {

   let body = {
      email: this.signinForm.get('email').value,
      password: this.signinForm.get('password').value
    }

    this.auth.signIn(body)
      .subscribe(result => {
        if (result === "success") {

          this.auth.setEmail(this.signinForm.get('email').value);

          this.router.navigate(['/home']);

          
        }
        if (result === "failure") {
          alert("user login failured may be you have to sign up or forgot password");
        }
        console.log(`obtained sigin data is ${result}`)
      }, error => { console.log(error); })


    //this.auth.login(this.signinForm.get('email').value, this.signinForm.get('password').value)
    //  .subscribe(data => {
    //    console.log("login success" + data);
    //    if (data) {
    //      this.router.navigate(['/']);
    //    } else {

    //    }


    //  });



  }

  buildContactForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

}
