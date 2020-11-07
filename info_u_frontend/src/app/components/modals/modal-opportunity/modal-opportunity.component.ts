import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { OpportunityI } from 'src/app/shared/models/opportunity';
import { GetDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'ngbd-modal-opportunity',
  templateUrl: './modal-opportunity.component.html',
  styleUrls: ['./modal-opportunity.component.css']
})
export class ModalOpportunityComponent {

  closeResult: string;

  public close = 'Cerrar';
  public info_label = 'Conócenos';
  public contact_label = 'Información de contacto';
  public phone_icon = 'https://firebasestorage.googleapis.com/v0/b/info-u-gt.appspot.com/o/general%2Fphone.png?alt=media&token=ea72da91-f21f-4a95-b153-bf0f16b7150b';
  public mail_icon = 'https://firebasestorage.googleapis.com/v0/b/info-u-gt.appspot.com/o/general%2Fmail.png?alt=media&token=9ee507d8-d06c-4662-bb86-eccd243dea84';
  public clock_icon = 'https://firebasestorage.googleapis.com/v0/b/info-u-gt.appspot.com/o/general%2Fclock.png?alt=media&token=53d0cd1d-30b0-46fb-b9d7-dea8660d32f1';
  public map_icon = 'https://firebasestorage.googleapis.com/v0/b/info-u-gt.appspot.com/o/general%2Fmap.png?alt=media&token=c190f444-aea0-4d2e-9110-31708370f93e';

  @Input()
  public opportunity: OpportunityI;

  opportunities$: Array<OpportunityI>;

  constructor(private modalService: NgbModal, private router: Router, private dataSvc: GetDataService) {
  }

  open(content: any, options?: NgbModalOptions) {
    this.opportunities$ = new Array();
    this.opportunity.description = this.opportunity.description.replace("&#34;", "\"");
    console.log(this.opportunity.web);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
    if (this.opportunity.img != '') {
      //this.router.navigate([this.opportunity.web]);
    }
  }
}
