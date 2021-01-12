import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor(private authService: AuthService, private storage: AngularFireStorage, private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private router: Router) {
    // override the route reuse strategy
    //this.router.routeReuseStrategy.shouldReuseRoute = function() {
    //  return false;
    //};
    //this.router.onSameUrlNavigation = 'reload';
    //this.router.navigate(['user/profile']);
  }
  
  @ViewChild('imageUser', {static: true})
  inputImageUser: ElementRef;
  
  @ViewChild('fileInput', {static: true})
  inputFileInput: ElementRef;
  
  mush_update_passowrd = true;
  providerId: string = 'null';
  update_form: FormGroup;
  submitted = false;
  error = '';
  
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  
  filePath: string;
  
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    password: '',
    roles: {}
  };
  
  ngOnInit() {
    // Allows for ngOnInit to be called on routing to the same routing Component since we will never reuse a route
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    // put the code from `ngOnInit` here
    this.spinner.show();
    this.update_form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    setTimeout(() => {
      this.authService.isAuth().subscribe(user => {
        if (user) {
          this.user.name = user.displayName;
          this.user.email = user.email;
          this.user.photoUrl = user.photoURL;
          this.providerId = user.providerData[0].providerId;
          // if (){
          //   console.log('Update password');
          //   this.mush_update_passowrd = true;
          // }
        }
      });
      this.spinner.hide();
    }, 2000);
  }
  
  on_update_password() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        auth.updatePassword(this.update_form.controls['password'].value)
        .catch(err => {
          this.error = err.message;
          console.log(err);
        });
        alert('Contraseña actualizada');
      } else {
        console.log('Not user logged');
      }
    });
  }

  on_update_email() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        auth.updateEmail(this.update_form.controls['email'].value)
        .catch(err => {
          this.error = err.message;
          console.log(err);
        });
        alert('Email actualizado');
      } else {
        console.log('Not user logged');
      }
    });
  }

  on_update_profile() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        auth.updateProfile({
          displayName: this.update_form.controls['name'].value,
          photoURL: this.inputImageUser.nativeElement.value
        }).catch(err => {
          this.error = err.message;
          console.log(err);
        });
        alert('Contraseña actualizada');
      } else {
        console.log('Not user logged');
      }
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.update_form.controls; }
  
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.update_form.invalid) {
      return;
    }
    this.onUpdateUser();
  }
  
  //Drag and drop
  files: any = [];
  
  selectFile(event: any) {    
    for (let index = 0; index < event.target.files.length; index++) {
      console.log('selectFile ', event);
      this.imageChangedEvent = event;
      const element = event.target.files[index];
      this.files.push(element.name)
      this.uploadFile(element);
    }
  }
  
  dndFile(files: any) {
    for (let index = 0; index < files.length; index++) {
      console.log('dndFile 0 ', files);
      this.imageChangedEvent = {target: {files: files}}
      const element = files[index];
      this.files.push(element.name)
      this.uploadFile(element);
    }
  }
  
  uploadFile(element: any) {
    const id = Math.random().toString(36).substring(2);
    const file = element;
    this.filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
  
  deleteAttachment(index: any) {
    this.files.splice(index, 1)
  }
  
  // Image cropper
  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  
  imageLoaded() {
    // show cropper
  }
  
  cropperReady() {
    // cropper ready
  }
  
  loadImageFailed() {
    // show message
  }
  
  // Firebase
  onUpdateUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        const ref = this.storage.ref(this.filePath);
        console.log('base 64 2:', this.croppedImage.replace('data:image/png;base64,', ''));
        const task = ref.putString(this.croppedImage.replace('data:image/png;base64,', ''), 'base64');
        //this.storage.upload(this.filePath, this.croppedImage); // To upload a file
        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
        this.on_update_email();
        // this.on_update_password();
        this.on_update_profile();
      } else {
        console.log('Not user logged');
      }
    });
  }

}
