import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  constructor(public auth: AngularFireAuth) { }

  loginFireauth(value: any){
    return new Promise<any> ( (resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
        (        res: any) => resolve(res),
        (        error: any) => reject(error)
      )
    })
   }

  userRegistration(value: any){
    return new Promise<any> ( (resolve, reject)=>{
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then(
        (        res: any) => resolve(res),
        (        error: any) => reject(error)
      )
    })
  }
}
