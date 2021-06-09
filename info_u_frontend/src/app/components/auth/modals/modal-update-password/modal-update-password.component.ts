import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-modal-update-password',
  templateUrl: './modal-update-password.component.html',
  styleUrls: ['./modal-update-password.component.css']
})
export class ModalUpdatePasswordComponent {

  // Strings
  close = 'Cerrar';
  title = "Actualizar contraseña";
  editIcon = 'https://firebasestorage.googleapis.com/v0/b/info-u-gt.appspot.com/o/general%2Fedit.png?alt=media&token=140e8a7d-f3ba-4890-b159-b756c3b65d30';
  update = "Actualizar";
  field_required = "La contraseña es requerida";
  field_invalid_1 = "La contraseña requiere almenos 6 carácteres";
  field_invalid_2 = "La contraseña requiere una mayúscula";
  field_must_match = "Las contraseñas no coinciden"
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
      current_password: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmed: ['', [Validators.required, Validators.minLength(6)],]
    }, { validators: MustMatch('password', 'password_confirmed') });
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
    this.authService.updatePassword(this.update_form.controls['password'].value)
      .then(() => {
        this.data.password = this.update_form.controls['password'].value;
        this.modalService.dismissAll();
      });
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
