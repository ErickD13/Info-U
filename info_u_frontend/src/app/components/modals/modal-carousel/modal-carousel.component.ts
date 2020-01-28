import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-carousel',
  templateUrl: './modal-carousel.component.html',
  styleUrls: ['./modal-carousel.component.css']
})
export class ModalCarouselComponent {

  closeResult: string;

  constructor(private modalService: NgbModal, private router: Router) {
  }

  public close = 'Cerrar';
  public title = 'Flexiones';

  @Input()
  public imagePath: string;
  @Input()
  public modalTitle: string;
  @Input()
  public description: string;
  @Input()
  public linkPath: string;
  @Input()
  public innerDiv: string;

  open(content) {
    console.log(this.description);
    this.description = this.description.replace("&#34;", "\"");
    console.log(this.description);
    this.modalService.open(content, { ariaLabelledBy: 'modal-carousel-title' }).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
    if (this.linkPath != '') {
      this.router.navigate([this.linkPath]);
    }
  }

}
