import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationUserMessage = {
    email:[
      {type:"required", message:"Please Enter Your Email"},
      {type:"pattern", message:"Your Email is Incorrect"}
    ],
    password:[
      {type:"required", message:"Please Enter Your Email"},
      {type:"minLength", message:"The Password must be at least 8 characters or more"}
    ]
  }

  validationFormUser: FormGroup;

  constructor(public formbuider: FormBuilder, public authservice: AuthService, private router: Router, private nav: NavController) {}

  ngOnInit() {
    this.validationFormUser = this.formbuider.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })
  }

  LoginUser(value: any){
    console.log("Login Successfully");

    try{
      this.authservice.loginFireauth(value).then(resp=>{
        console.log(resp);
        this.router.navigate(['home'])
      })
    }catch(err){
      console.log(err);
    }
  }


}
