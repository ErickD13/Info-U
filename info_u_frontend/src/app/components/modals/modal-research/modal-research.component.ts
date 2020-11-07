import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { OpportunityI } from 'src/app/shared/models/opportunity';
import { GetDataService } from 'src/app/shared/services/get-data.service';
import { ResearchI } from 'src/app/shared/models/research.interface';

@Component({
  selector: 'ngbd-modal-research',
  templateUrl: './modal-research.component.html',
  styleUrls: ['./modal-research.component.css']
})
export class ModalResearchComponent {

  closeResult: string;

  public close = 'Cerrar';
  public inscription = 'Inscripción';
  public careers = 'Carreras';
  public locations = 'Ubicaciones';

  @Input()
  public research: ResearchI;

  opportunities$: Array<OpportunityI>;

  constructor(private modalService: NgbModal, private router: Router, private dataSvc: GetDataService) {
  }

  open(content: any, options?: NgbModalOptions) {
    this.opportunities$ = new Array();
    this.research.description = this.research.description.replace("&#34;", "\"");
    console.log(this.research.web);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass" }).result.then((result) => {
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
    if (this.research.img != '') {
      //this.router.navigate([this.research.web]);
    }
  }

}
