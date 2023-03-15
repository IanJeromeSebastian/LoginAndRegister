import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import {AlertController, NavController,LoadingController} from '@ionic/angular'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validationMessages = {
    username: [{type:"required", message:"Please Enter your Full Names"}],
    phone: [{type:"required", message:"Please Enter your Phone No."}],
    email: [
      {type: 'required',message:"Enter your Email Adress"},
      {type:"pattern", meesage:"Please the Email Entered is Incorrect. Try again.."}
    ],
    password: [
      {type: "required", message: "Password must be at least 8 character"},
      {type:"minlength", message: "Password must be at least 8 character"}
    ]
 }

 ValidationFormUSer : FormGroup;
  loading: any;

  constructor(private router: Router,
    private navCtr: NavController ,private formbuilder:FormBuilder, private authService: AuthService, public loadingCtrl : LoadingController, private alertCtrl: AlertController) { 
      this.loading = this.loadingCtrl
    }

  ngOnInit() {
    this.ValidationFormUSer = this.formbuilder.group({
      username: new FormControl('', Validators.compose([
         Validators.required
      ])),
  
      phone: new FormControl('', Validators.compose([
        Validators.required
      ])),
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

  registerUser(value: any){
    console.log("Register Successfully");
    try {
      this.authService.userRegistration(value).then(response =>{
        console.log(response);
        if(response.user){
          // response.updateProfile({
          //   // displayName: value.username,
          //   // phoneNumber: value.phone,
          //   // email: value.email
          // });
     this.loading.dismiss();
     this.router.navigate(['home']);
        }}
      // }, error=>{
      //   this.loading.dismiss();
      //   this.errorLoading(error.message);
      // }
      )
    } catch (error) {
      console.log(error)
    }
  }

  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:"Error Registering",
      message:message,
      buttons:[{
        text:'ok',
        handler: ()=>{
        this.navCtr.navigateBack(['signup'])
      }
      }]
    })
     await loading.present();
  }

  async showalert(){
    var load = await this.alertCtrl.create({
      message:"Please wait",
    })
    load.present();
  }

}
