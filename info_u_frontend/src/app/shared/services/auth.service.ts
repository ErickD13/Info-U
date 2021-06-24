import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { setupTestingRouter } from '@angular/router/testing';
import { auth } from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import { windowCount } from 'rxjs/operators';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  accountDeleted = 'Cuenta eliminada.'

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
  async signIn(email, password) {
    this.spinner.show();
    try {
      const result_1 = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        this.updateUserData(result_1.user).then(() => {
          this.router.navigate(['user/profile/update']).then(() => {
            this.spinner.hide();
          });
        });
      });
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      window.alert(error.message);
    }
  }

  // Sign up with email/password
  async signUp(email, password) {
    this.spinner.show();
    try {
      const result_1 = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.SendVerificationMail().then(() => {
        this.setUserData(result_1.user).then(() => {
          this.spinner.hide();
        });
      });
    } catch (error) {
      this.spinner.hide();
      window.alert(error.message);
    }
  }

  async register(email, password) {
    this.spinner.show();
    try {
      const result_1 = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.setUserData(result_1.user).then(() => {
        this.SendVerificationMail().then(() => {
          this.spinner.hide();
          return result_1.user;
        });
      });
    } catch (error) {
      this.spinner.hide();
      window.alert(error.message);
    }
  }

  deleteUser() {
    var user = this.afAuth.auth.currentUser;
    user.delete().then(function () {
      if (confirm(this.accountDeleted)) {
        this.signOut();
      }
    }).catch(function (error) {
      if (confirm(error)) {
        this.signOut();
      }
    });
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    try {
      this.spinner.show();
      await this.afAuth.auth.currentUser.sendEmailVerification();
      this.ngZone.run(() => {
        this.router.navigate(['user/verify']);
        this.spinner.hide();
      });
    } catch (error) {
      this.spinner.hide();
      window.alert(error);
    }
  }
  //show sppiner
  // Reset Forggot password
  async ForgotPassword(passwordResetEmail) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Se ha enviado a tu correo un enlace para reestablecer la contraseña.');
    } catch (error) {
      window.alert(error);
    }
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
  async AuthLogin(provider) {
    this.spinner.show();
    try {
      const result_1 = await this.afAuth.auth.signInWithPopup(provider);
      console.log("result_1", result_1);
      this.ngZone.run(() => {
        this.setUserData(result_1.user).then(() => {
          if (result_1.user.emailVerified) {
            this.router.navigate(['user/profile/update'])
              .then(() => {
                this.spinner.hide();
                return result_1.user;
              });
          } else {
            this.SendVerificationMail()
          }
        });
      });
    } catch (error1) {
      console.log('error1', error1);
      if (error1.email && error1.credential && error1.code === 'auth/account-exists-with-different-credential') {
        const providers = await auth().fetchSignInMethodsForEmail(error1.email)
        const firstPopupProviderMethod = providers.find(p => this.supportedPopupSignInMethods.includes(p));

        // Test: Could this happen with email link then trying social provider?
        if (!firstPopupProviderMethod) {
          throw new window.alert(`El proveedor no es soportado`);
        }
        try {
          const linkedProvider = this.getProvider(firstPopupProviderMethod);
          linkedProvider.setCustomParameters({ login_hint: error1.email });

          const result2 = await auth().signInWithPopup(linkedProvider);
          result2.user.linkWithCredential(error1.credential)
            .then(() => {
              this.ngZone.run(() => {
                this.updateUserData(result2.user)
                  .then(() => {
                    this.router.navigate(['user/profile/update'])
                      .then(() => {
                        this.spinner.hide();
                        return result2.user;
                      });
                  });
              });
            });
        } catch (error2) {
          this.spinner.hide();
          console.log('error2', error2);
          window.alert('error2 ' + error2);
        }
      } else {
        this.spinner.hide();
        window.alert('error1 ' + error1);
      }
    }
  }

  getProvider(providerId) {
    switch (providerId) {
      case auth.GoogleAuthProvider.PROVIDER_ID:
        return new auth.GoogleAuthProvider();
      case auth.FacebookAuthProvider.PROVIDER_ID:
        return new auth.FacebookAuthProvider();
      case auth.GithubAuthProvider.PROVIDER_ID:
        return new auth.GithubAuthProvider();
      default:
        throw new Error(`No provider implemented for ${providerId}`);
    }
  }

  supportedPopupSignInMethods = [
    auth.GoogleAuthProvider.PROVIDER_ID,
    auth.FacebookAuthProvider.PROVIDER_ID,
    auth.GithubAuthProvider.PROVIDER_ID,
  ];

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user) {
    console.log("userinfo", user);
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

  updateUserData(user) {
    console.log("userinfo", user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    let currentUser = this.afAuth.auth.currentUser;
    var id = currentUser.uid;
    var email = currentUser.email;
    var displayName = currentUser.displayName;
    var photoURL = currentUser.photoURL;
    var emailVerified = currentUser.emailVerified;
    if (!currentUser.uid) id = user.uid;
    if (!currentUser.email) email = user.email;
    if (!currentUser.displayName) displayName = user.displayName;
    if (!currentUser.photoURL) photoURL = user.photoURL;
    if (!currentUser.emailVerified) emailVerified = user.emailVerified;
    const userData: UserInterface = {
      id: id,
      email: email,
      name: displayName,
      photoURL: photoURL,
      emailVerified: emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  async updateProfile(user, image) {
    try {
      await this.afAuth.auth.currentUser.updateProfile({
        displayName: user,
        photoURL: image
      })
        .then(() => {
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        });
    } catch (error) {
      this.spinner.hide();
      window.alert(error);
    }
  }

  async updateAvatar(image) {
    try {
      await this.afAuth.auth.currentUser.updateProfile({
        displayName: this.afAuth.auth.currentUser.displayName,
        photoURL: image
      })
        .then(() => {
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        }).then(() => {
          window.alert('Imagen actualizada');
        }).then(() => {
          this.router.navigate(['user/profile/update']);
        });
    } catch (error) {
      this.spinner.hide();
      window.alert(error);
    }
  }

  async updateUser(username) {
    this.spinner.show();
    try {
      await this.afAuth.auth.currentUser.updateProfile({
        displayName: username,
        photoURL: this.afAuth.auth.currentUser.photoURL
      })
        .then(() => {
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          this.spinner.hide();
        }).then(() => {
          window.alert('Usuario actualizado');
        }).then(() => {
          this.router.navigate(['user/profile/update']);
        });
    } catch (error) {
      this.spinner.hide();
      window.alert(error);
    }
  }

  async updatePassword(password) {
    try {
      await this.afAuth.auth.currentUser.updatePassword(password)
        .then(() => {
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        }).then(() => {
          window.alert('Contraseña actualizada');
        }).then(() => {
          this.router.navigate(['user/profile/update']);
        });
    } catch (error) {
      this.spinner.hide();
      window.alert(error);
    }
  }

  async updateEmail(email) {
    try {
      await this.afAuth.auth.currentUser.updateEmail(email)
        .then(() => {
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        }).then(() => {
          window.alert('Correo actualizado');
        }).then(() => {
          this.router.navigate(['user/profile/update']);
        });
    } catch (error) {
      this.spinner.hide();
      window.alert(error);
    }
  }

  // Sign out 
  async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
