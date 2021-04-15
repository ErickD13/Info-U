import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-modal-update-avatar',
  templateUrl: './modal-update-avatar.component.html',
  styleUrls: ['./modal-update-avatar.component.css']
})
export class ModalUpdateAvatarComponent {

  closeResult: string;

  public close = 'Cerrar';
  public inscription = 'Inscripción';
  public careers = 'Carreras';
  public locations = 'Ubicaciones';

  @Input()
  public data: UserInterface;

  constructor(private modalService: NgbModal, private router: Router, private authService: AuthService) {
  }

  open(content: any, options?: NgbModalOptions) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title', windowClass : "myCustomModalClass"}).result.then((result) => {
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

}
