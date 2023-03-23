import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { profile } from 'console';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private daysArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  public date = new Date();

  public localdate = new Date().toLocaleDateString();

  public hour: any;
  public minute: any;
  public second: any;
  public ampm: any;
  public day: any;
  public now: any;
  //profile: any;
  profileName: any;

   constructor(private database : AngularFirestore, private authservice: AuthService) {}


  
  ngOnInit() {
    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);

    this.day = this.daysArray[this.date.getDay()];

    firebase.auth().onAuthStateChanged( user=>{
      console.log("AUTH_USER", user);
      
      if (user){
        const result = this.database.doc(`/profile/${this.authservice.getUID()}`);
        var userprofile = result.valueChanges();
        userprofile.subscribe((profile : any) => {
          console.log("PROFILE: ", profile);
          this.profileName = profile['name'];
        })
      }
    })
    
  }


  private updateDate(date: Date){
    const hours = date.getHours();

    this.ampm = hours >= 12 ? 'PM' : 'AM';

    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;

    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;


    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();

    const seconds = date.getSeconds();
    this.second = seconds < 10 ? '0' + seconds :seconds.toString();

    const now = new Date();

    console.log(now);

  }

}
