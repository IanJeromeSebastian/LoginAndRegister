import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BiometryType, NativeBiometric } from "capacitor-native-biometric";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: any;
  public password: any;
  public toggleTrue: boolean = false;
  public getToggle: any;

  validationUserMessage = {
    email:[
      {type:"required", message:"Please Enter Your Email"},
      {type:"pattern", message:"Your Email is Incorrect"}
    ],
    password:[
      {type:"required", message:"The Password must be at least 8 characters or more"},
      {type:"minLength", message:"The Password must be at least 8 characters or more"}
    ]
  }

  validationFormUser: FormGroup;

  constructor(public formbuilder: FormBuilder, public authservice: AuthService
    , private router: Router, private nav: NavController, private firestore: AngularFirestore) {}

  ngOnInit() {
  //  this.buttonBio()
    this.validationFormUser = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })
    this.getToggle = sessionStorage.getItem("toggleButton")
      if(this.getToggle == "true"){
        this.toggleTrue = true;
      }else{
       this.toggleTrue = false
      }

  }

  // buttonBio(){
  //   this.toggleTrue = this.authservice.getToggle();
  //   console.log("dsdfvsdhgieufnvf", this.toggleTrue)
  // }

  LoginUser(value: any){
    console.log("Login Successfully", value);

    try{
      this.authservice.loginFireauth(value).then(resp=>{
        sessionStorage.setItem("Username", value.email),
        sessionStorage.setItem("Password", value.password)
        console.log(resp);
       // this.router.navigate(['tabs'])
       sessionStorage.getItem('Username');
       this.getToggle = sessionStorage.getItem('Username');
       if (this.getToggle != this.email){
        sessionStorage.setItem("toggleButton", "false")
       }
       else{
        sessionStorage.setItem("Username", this.email)
        sessionStorage.setItem("Password", this.password)
        this.email='';
        this.password = '';
        this.nav.navigateForward(['tabs']);
       }

        if(resp.user){

          this.authservice.setUser({
            username : resp.user.displayName,
            uid: resp.user.uid
          })
   
         const userProfile = this.firestore.collection('profile').doc(resp.user.uid);
   
          userProfile.get().subscribe(result=>{
   
           if(result.exists){
             this.nav.navigateForward(['tabs']);
           }else{
   
             this.firestore.doc(`profile/${this.authservice.getUID()}`).set({
               name: resp.user.displayName,
               email: resp.user.email
             });
   
              this.nav.navigateForward(['tabs']);
           }
          })
        }

      })
    }catch(err){
      console.log(err);
    }
  }

  async biometrics(){
    const result = await NativeBiometric.isAvailable();

  if(!result.isAvailable) return;

  const isFaceID = result.biometryType == BiometryType.FACE_ID;
    
  const verified = await NativeBiometric.verifyIdentity({
    reason: "For easy log in",
    title: "Log in",
    subtitle: "Maybe add subtitle here?",
    description: "Maybe a description too?",
  })
    .then(() => true)
    .catch(() => false);

  if(!verified) return;

  const credentials = await NativeBiometric.getCredentials({
    server: "trangko",
  });

  if(credentials.username){
    this.LoginUser({
      email: credentials.username,
      password: credentials.password
    })
  }

  }

  toggle(){
    this.toggleTrue = this.authservice.getToggle();
  }

}
