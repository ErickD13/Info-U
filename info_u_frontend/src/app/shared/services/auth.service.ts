import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => {
        resolve(userData),
        this.updateUserData(userData.user)
      }).catch(err => console.log(reject(err)))
    });
  }
  
  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }
  
  async loginFacebookUser() {
    const credential = await this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    return await this.updateUserData(credential.user);
  }
  
  async loginGoogleUser() {
    const credential = await this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    return await this.updateUserData(credential.user);
  }

  async singUpGoogleUser() {
    const credential = await this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    return await this.updateUserData(credential.user);
  }
  
  logoutUser() {
    return this.afsAuth.auth.signOut();
  }
  
  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
  
  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        editor: true
      }
    }
    return userRef.set(data, { merge: true })
  }
  
  isUserAdmin(userUid: any) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
  
}
