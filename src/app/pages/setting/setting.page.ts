import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  firebaseconfig: any ={
    apiKey: "",
    authDomain: "",
    projectId: ""
  }

  constructor(private router: Router, private nav: NavController,
     public afAuth: AngularFireAuth, public authservice: AuthService ) { }

  ngOnInit() {
    if(firebase.apps.length == 0){
      firebase.initializeApp(this.firebaseconfig);
    }
  }

  gotoLogout(){
    this.authservice.logOut();
    console.log("logout");
    
    // return this.afAuth.signOut().then(() => {
    //   window.alert('Logged out!');
    //   this.nav.navigateForward(['splash']);
    //   });

    // this.afAuth.signOut().then(()=>{
    //   this.router.navigate(['/splash']);
    // })
  
  }

}
