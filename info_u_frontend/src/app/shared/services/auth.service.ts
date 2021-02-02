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
      }).catch(err => console.log('register user error', reject(err)))
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
    const credential = await this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.providerId;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      return this.updateUserData(credential.user);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      return error;
    });
  }

  async singUpGoogleUser() {
    const credential = await this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.providerId;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      return this.updateUserData(credential.user);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      return error;
    });
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
  
  getAfs() {
    return this.afsAuth;
  }

}
