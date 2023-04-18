import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service'
import { BiometryType, NativeBiometric } from "capacitor-native-biometric";

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

  public hasBiometrics: boolean = true;
  public isBiometricsEnabled: boolean = false;

  constructor(private router: Router, private nav: NavController,
     public afAuth: AngularFireAuth, public authservice: AuthService ) { }

  ngOnInit() {
    if(firebase.apps.length == 0){
      firebase.initializeApp(this.firebaseconfig);
    }
  }

  async initiateBiometrics(){
    
    console.log("fsdhfbsdiucnsdif")
    const result = await NativeBiometric.isAvailable();
    this.hasBiometrics = result.isAvailable

    const credential = await NativeBiometric.getCredentials({
      server: "trangko",
    }).then();
    if (credential.username){
      this.isBiometricsEnabled = true;
      
    }else {
      this.isBiometricsEnabled = false;
    }

  }

  toggleFunction(){
    this.authservice.setToggle(
      this.isBiometricsEnabled
    )
    console.log("fsdhfbsdiucnsdif", this.authservice.getToggle());
    console.log("fsdhfbsdiucnsdif", this.isBiometricsEnabled);
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

  enableBiometrics(){
    NativeBiometric.setCredentials({
      username: sessionStorage.getItem("Username") || "",
      password: sessionStorage.getItem("Password") || "",
      server: "trangko",
    }).then();
  }

  disableBiometrics(){
    NativeBiometric.deleteCredentials({
      server: "trangko",
    }).then();
  }

}
