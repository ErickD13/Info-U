import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-modal-update-avatar',
  templateUrl: './modal-update-avatar.component.html',
  styleUrls: ['./modal-update-avatar.component.css']
})
export class ModalUpdateAvatarComponent implements OnInit, OnDestroy {

  // Strings
  close = 'Cerrar';
  title = "Actualizar imagen de perfil";
  editIcon = 'https://firebasestorage.googleapis.com/v0/b/info-u-gt.appspot.com/o/general%2Fedit.png?alt=media&token=140e8a7d-f3ba-4890-b159-b756c3b65d30';
  update = "Actualizar";
  field_required = "La imagen es requerida";
  // Flags
  closeResult: string;

  // Vars
  update_form: FormGroup;
  submitted = false;
  error = '';
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  filePath: string;
  files: NgxFileDropEntry[] = [];

  @Input()
  public data: UserInterface;

  @ViewChild('imageUser', { static: true })
  inputImageUser: ElementRef;

  @ViewChild('fileInput', { static: true })
  inputFileInput: ElementRef;

  subscription: Subscription

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage
  ) {
    this.update_form = this.formBuilder.group({
      image: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.submitted = false;
    this.error = '';
    this.uploadPercent = null;
    this.urlImage = null;
    this.filePath = null;
    this.files = [];
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  // Modal
  open(content: any, options?: NgbModalOptions) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.update_form.controls; }

  // Business logic
  on_update_field() {
    this.urlImage.subscribe(url => {
      this.authService.updateAvatar(url)
        .then(() => {
          this.data.photoURL = url;
          this.modalService.dismissAll();
        });
    });
  }

  onSubmit() {
    this.on_update_field();
  }

  //Drag and drop
  dropped(files: any) {
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
    //this.subscription.add(
      task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    //);
  }

}
