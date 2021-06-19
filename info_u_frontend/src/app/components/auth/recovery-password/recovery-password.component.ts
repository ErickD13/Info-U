import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  recovery = "Recuperación de contraseña";
  email_required = "El correo es requerido";
  email_invalid = "El formato de correo es incorrecto";
  recoveryForm: FormGroup;
  submitted = false;
  error = '';

  constructor(private router: Router, public authService: AuthService, private storage: AngularFireStorage, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.error = ''
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.recoveryForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.recoveryForm.invalid) {
      return;
    }
    this.passwordRecovery();
  }
  
  passwordRecovery(): void {
    this.authService.ForgotPassword(this.recoveryForm.controls['email'].value)
      .then(() => {
        this.router.navigate(['user/login']);
      })
  }

}
