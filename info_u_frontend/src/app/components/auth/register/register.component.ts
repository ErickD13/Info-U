import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable, Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  // Strings
  register = "Registro";
  name_required = "El nombre es requerido";
  email_required = "El correo es requerido";
  password_required = "La contraseña es requerida";
  email_invalid = "El formato de correo es incorrecto";
  password_invalid_1 = "La contraseña requiere almenos 6 carácteres";
  password_invalid_2 = "La contraseña requiere una mayúscula";
  password_invalid_3 = "La contraseña requiere 1 número";
  password_invalid_4 = "La contraseña requiere 1 caracter especial";
  password_must_match = "Las contraseñas no coinciden"
  user_registered = "¿Ya posees una cuenta?";
  facebook = "Facebook";
  google = "Google";

  @ViewChild('imageUser', { static: true })
  inputImageUser: ElementRef;

  @ViewChild('fileInput', { static: true })
  inputFileInput: ElementRef;

  registerForm: FormGroup;
  submitted = false;
  error = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  filePath: string;

  subscription: Subscription

  constructor(private router: Router, public authService: AuthService, private storage: AngularFireStorage, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group ({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmed: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: MustMatch('password', 'password_confirmed')
    });
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    console.log("1");
    if (this.registerForm.invalid) {
      console.log("No debe pasar por aquí");
      return;
    }
    console.log("2");
    this.onAddUser();
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

  onAddUser() {
    let user = this.authService.register(this.registerForm.controls['email'].value, this.registerForm.controls['password'].value)
      .then(() => {
        if (user) {
          const ref = this.storage.ref(this.filePath);
          const task = ref.putString(this.croppedImage.replace('data:image/png;base64,', ''), 'base64');
          //this.storage.upload(this.filePath, this.croppedImage); // To upload a file
          this.uploadPercent = task.percentageChanges();
          //this.subscription.add(
            task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
          //);
          this.authService.updateProfile(this.registerForm.controls['name'].value, this.inputImageUser.nativeElement.value)
        }
      });
  }

  onSingUpGoogle(): void {
    this.authService.GoogleAuth();
  }

  onSingUpFacebook(): void {
    this.authService.FacebookAuth();
  }

  onLoginRedirect(): void {
    this.router.navigate(['user/profile']);
  }

}
