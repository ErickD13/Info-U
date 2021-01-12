import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage, private formBuilder: FormBuilder) { }
  
  @ViewChild('imageUser', {static: true})
  inputImageUser: ElementRef;
  
  @ViewChild('fileInput', {static: true})
  inputFileInput: ElementRef;
  
  registerForm: FormGroup;
  submitted = false;
  error = '';
  
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  
  filePath: string;
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      this.onAddUser();
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
  onAddUser() {
    this.authService.registerUser(this.registerForm.controls['email'].value, this.registerForm.controls['password'].value)
    .then((res) => {
      this.authService.isAuth().subscribe(user => {
        if (user) {
          const ref = this.storage.ref(this.filePath);
          console.log('base 64 2:', this.croppedImage.replace('data:image/png;base64,', ''));
          const task = ref.putString(this.croppedImage.replace('data:image/png;base64,', ''), 'base64');
          //this.storage.upload(this.filePath, this.croppedImage); // To upload a file
          this.uploadPercent = task.percentageChanges();
          task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
          user.updateProfile({
            displayName: this.registerForm.controls['name'].value,
            photoURL: this.inputImageUser.nativeElement.value
          }).then(() => {
            this.router.navigate(['user/profile']);
          }).catch(err => {
            this.error = err.message;
            console.log(err);
          });
        }
      });
    }).catch(err => {
      this.error = err.message;
      console.log(err);
    });
  }
  
  onSingUpGoogle(): void {
    this.authService.loginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => {
      this.error = err.message;
      console.log(err);
    });
  }
  
  onSingUpFacebook(): void {
    this.authService.loginFacebookUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => {
      this.error = err.message;
      console.log(err);
    });
  }
  
  onLoginRedirect(): void {
    this.router.navigate(['user/profile']);
  }
  
}
