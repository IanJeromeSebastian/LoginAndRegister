import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileImageUrl: any;

  constructor(private router: Router, private nav: NavController,
    private database : AngularFirestore,private authservice: AuthService) {
      firebase.auth().onAuthStateChanged(user => {
        console.log("AUTH_USER", user);
  
        if (user) {
          const result = this.database.doc(`/profile/${this.authservice.getUID()}`);
          var userprofile = result.valueChanges();
          userprofile.subscribe((profile : any) => {
            console.log("PROFILE::", profile);
             this.profileImageUrl = profile['photoUrl'];
          })
        }
      })
     }

  ngOnInit() {
  }

  gotoUpload(){
    this.nav.navigateForward(['uploadimage'])
  }

}
