import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor(private authService: AuthService) { }
  
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    roles: {}
  };
  
  public mush_update_passowrd = false;
  public providerId: string = 'null';
  public email: string = '';
  public password: string = '';
  public error = '';

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
        /*if (){
          console.log('Update password');
          this.mush_update_passowrd = true;
        }*/
      }
    })
  }
  
  on_update_password() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        auth.updatePassword(this.password)
        alert('Contraseña actualizada');
      } else {
        console.log('Not user logged');
      }
    });
  }

}
