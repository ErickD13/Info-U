import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }
  
  providerId: string = 'null';
  update_form: FormGroup;
  user: UserInterface = {};

  ngOnInit() {
    this.update_form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    let userData = JSON.parse(localStorage.getItem('user'));
    this.user.id = userData.uid;
    this.user.email = userData.email;
    this.user.name = userData.displayName;
    this.user.photoURL = userData.photoURL;
    this.user.emailVerified = userData.emailVerified;
  }

}
