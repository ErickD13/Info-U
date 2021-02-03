import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth, User } from 'firebase';
import { map } from 'rxjs/operators';
import { UserInterface } from '../models/user.interface';
import { Navigation } from '../singleton/navigation';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async email_signup(email: string, password: string) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    this.send_email_verification();
  }

  async email_login(email: string, password: string) {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['user/profile']);
  }

  async send_email_verification() {
    await this.afAuth.auth.currentUser.sendEmailVerification()
    this.router.navigate(['user/verification']);
  }

  async send_password_reset(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  get is_user_loggedin(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async google_login() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    this.router.navigate(['user/profile']);
  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user)
        }).catch(err => console.log('register user error', reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  async loginFacebookUser() {
    const credential = await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    return await this.updateUserData(credential.user);
  }

  async loginGoogleUser() {
    const credential = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(function (result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.providerId;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      return this.updateUserData(credential.user);
    }).catch(function (error) {
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
    const credential = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(function (result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.providerId;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      return this.updateUserData(credential.user);
    }).catch(function (error) {
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
    return this.afAuth.auth.signOut();
  }

  getUser() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  isUserLogged() {
    Navigation.is_user_loggedin = true;
    /*return this.afsAuth.authState.pipe(map(auth => auth)).subscribe(auth => {
      if (auth) {
        console.log('user logged');
        Navigation.is_loged = true;
      } else {
        console.log('not user logged');
        Navigation.is_loged = false;
      }
    });*/
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
    return this.afAuth;
  }

}
