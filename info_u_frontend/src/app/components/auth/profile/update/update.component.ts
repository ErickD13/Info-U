import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
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

  @ViewChild('imageUser', { static: true })
  inputImageUser: ElementRef;

  @ViewChild('fileInput', { static: true })
  inputFileInput: ElementRef;

  must_update_passowrd = true;
  providerId: string = 'null';
  update_form: FormGroup;
  submitted = false;
  error = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  filePath: string;

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

  on_update_password() {
    this.authService.updatePassword(this.update_form.controls['password'].value);
  }

  on_update_email() {
    this.authService.userData.subscribe(auth => {
      if (auth) {
        auth.updateEmail(this.update_form.controls['email'].value)
          .catch(err => {
            this.error = err.message;
            console.log('update email error:', err);
          });
        alert('Email actualizado');
      } else {
        console.log('update email user logged');
      }
    });
  }

  on_update_profile() {
    this.authService.userData.subscribe(auth => {
      if (auth) {
        auth.updateProfile({
          displayName: this.update_form.controls['name'].value,
          photoURL: this.inputImageUser.nativeElement.value
        }).catch(err => {
          this.error = err.message;
          console.log('update name and photo error:', err);
        });
        alert('Contraseña actualizada');
      } else {
        console.log('update name and photo not user logged');
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
  files: NgxFileDropEntry[] = [];

  dropped(files: any) {
    //this.imageChangedEvent = {target: {files: files}};
    console.log('finding event', this.imageChangedEvent);
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          this.imageChangedEvent = { target: { files: [file] } }
          console.log(droppedFile.relativePath, file);
          this.uploadFile(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
        alert("Elige una imagen.");
      }
    }
  }

  public fileOver(event: any) {
    console.log('file over', event);
  }

  public fileLeave(event: any) {
    console.log('file leave', event);
  }

  public setEvent(event: any) {
    this.imageChangedEvent = event;
    console.log('set Event', event);
  }

  deleteAttachment(index: any) {
    this.files.splice(index, 1)
  }

  // Image cropper
  imageChangedEvent: any = '';
  croppedImage: any = '';

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(this.croppedImage);
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
  uploadFile(element: any) {
    const id = Math.random().toString(36).substring(2);
    const file = element;
    this.filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  onUpdateUser() {
    this.on_update_password();

    /*this.authService.userData.subscribe(auth => {
      if (auth) {
        const ref = this.storage.ref(this.filePath);
        const task = ref.putString(this.croppedImage.replace('data:image/png;base64,', ''), 'base64');
        //this.storage.upload(this.filePath, this.croppedImage); // To upload a file
        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
        this.on_update_email();
        // this.on_update_password();
        this.on_update_profile();
      } else {
        console.log('load profile not user logged');
      }
    });*/
  }

}
