import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

export interface UserPro{
  username: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //[x: string]: any;

  private user : UserPro;
  toggle: boolean;

  constructor(public auth: AngularFireAuth, private router: Router,
    public afAuth: AngularFireAuth ) { }

  loginFireauth(value: any){
    return new Promise<any> ( (resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
        (        res: any) => resolve(res),
        (        error: any) => reject(error)
      )
    })
   }

   setUser(user : UserPro){
    return this.user = user;
   }

   getUID(): string{
    return this.user.uid;
   }

  userRegistration(value: any){
    return new Promise<any> ( (resolve, reject)=>{
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then(
        (        res: any) => resolve(res),
        (        error: any) => reject(error)
      )
    })
  }

  logOut(){
    this.afAuth.signOut().then(()=>{
    })
  }

  setToggle(toggle : boolean){
    return this.toggle = toggle
  }

  getToggle(){
    return this.toggle;
  }

}
