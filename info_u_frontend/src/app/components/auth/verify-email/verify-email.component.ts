import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  welcome = "Bienvenido a Info U";
  description1 = "Revisa tu inbox para verificar tu correo elctrónico";
  description2 = "¿No has recibio el correo?";
  description3 = "¿Verificación completa?";
  verify = "Enviar de nuevo";
  signin = "Iniciar sesión";
  email_image = "https://firebasestorage.googleapis.com/v0/b/info-u-gt.appspot.com/o/general%2Fmail.png?alt=media&token=9ee507d8-d06c-4662-bb86-eccd243dea84";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.welcome += ` ${user.displayName}`;
  }

  reload() {
    this.authService.SendVerificationMail();
  }

  gotoLogin() {
    this.router.navigate(['user/login']);
  }

}
