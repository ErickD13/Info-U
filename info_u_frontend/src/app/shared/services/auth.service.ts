import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private spinner: NgxSpinnerService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.spinner.show();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
      this.spinner.hide();
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    this.spinner.show();
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.setUserData(result.user).then(() => {
            this.router.navigate(['user/profile']).then(() => {
              this.spinner.hide();
            });
          });
        })
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    this.spinner.show();
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail().then(() => {
          this.setUserData(result.user).then(() => {
            this.spinner.hide();
          });
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  deleteUser() {
    var user = this.afAuth.auth.currentUser;
    user.delete().then(function () {
      // User deleted.
    }).catch(function (error) {
      // An error happened.
    });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['user/verify']);
      })
  }
  //show sppiner
  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    this.spinner.show();
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.setUserData(result.user).then(() => {
            this.router.navigate(['user/profile']).then(() => {
              this.spinner.hide();
            });
          });
        })
      }).catch((error1) => {
        if(error1.code == 'auth/account-exists-with-different-credential') {
          return this.afAuth.auth.currentUser.linkWithPopup(provider)
          .then((result) => {
            this.ngZone.run(() => {
              this.setUserData(result.user).then(() => {
                this.router.navigate(['user/profile']).then(() => {
                  this.spinner.hide();
                });
              });
            })
          }).catch((error2) => {
            this.spinner.hide();
            console.log(error2);
            window.alert('error2 ' + error2);
          });
        }
        this.spinner.hide();
        console.log(error1);
        window.alert('error1 ' + error1);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: UserInterface = {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  updatePassword(password){
    return this.afAuth.auth.currentUser.updatePassword(password).then(() => {
      window.alert('Contraseña actualizada');
    })
    .catch((error) => {
      this.spinner.hide();
      window.alert(error)
    });
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    })
  }

}
