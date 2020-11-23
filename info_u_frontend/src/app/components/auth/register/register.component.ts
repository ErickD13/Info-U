import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
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
  
  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) { }
  
  @ViewChild('imageUser', {static: true})
  inputImageUser: ElementRef;
  
  @ViewChild('fileInput', {static: true})
  inputFileInput: ElementRef;
  
  public email: string = '';
  public password: string = '';
  
  uploadPercent: Observable<number>;
  public urlImage: Observable<string>;
  
  filePath: string;
  
  ngOnInit() {
    console.log('dndFile element 1 ', this.inputImageUser);
    console.log('dndFile element 2 ', this.inputFileInput.nativeElement.value);
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
    this.authService.registerUser(this.email, this.password)
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
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value
          }).then(() => {
            this.router.navigate(['user/profile']);
          }).catch((error) => console.log('error', error));
        }
      });
    }).catch(err => console.log('err', err.message));
  }
  
  onSingUpGoogle(): void {
    this.authService.loginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
  }
  
  onSingUpFacebook(): void {
    this.authService.loginFacebookUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
  }
  
  onLoginRedirect(): void {
    this.router.navigate(['user/profile']);
  }
  
}
