import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-modal-update-email',
  templateUrl: './modal-update-email.component.html',
  styleUrls: ['./modal-update-email.component.css']
})
export class ModalUpdateEmailComponent {

  // Strings
  close = 'Cerrar';
  title = "Actualización de correo";
  editIcon = 'https://firebasestorage.googleapis.com/v0/b/info-u-gt.appspot.com/o/general%2Fedit.png?alt=media&token=140e8a7d-f3ba-4890-b159-b756c3b65d30';
  update = "Actualizar";
  field_required = "El correo es requerida";
  field_invalid = "El formato de correo es incorrecto";
  // Flags
  closeResult: string;

  // Vars
  update_form: FormGroup;
  submitted = false;
  error = '';

  @Input()
  public data: UserInterface;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.update_form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
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

  goto(): void {
    if (this.data.photoURL != '') {
      //this.router.navigate([this.university.web]);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.update_form.controls; }

  // Business logic
  on_update_field() {
    this.authService.updateEmail(this.update_form.controls['email'].value);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.update_form.invalid) {
      return;
    }
    this.on_update_field();
  }

}
