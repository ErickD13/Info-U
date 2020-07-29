import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { OpportunityI } from 'src/app/shared/models/opportunity';
import { UniversityI } from 'src/app/shared/models/university.interface';
import { GetDataService } from 'src/app/shared/services/get-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngbd-modal-university',
  templateUrl: './modal-university.component.html',
  styleUrls: ['./modal-university.component.css']
})
export class ModalUniversityComponent {

  closeResult: string;

  constructor(private modalService: NgbModal, private router: Router, private dataSvc: GetDataService) {
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
  public careers: Array<string>;
  @Input()
  public locations: Array<string>;
  @Input()
  public opportunities: Array<string>;
  @Input()
  public innerDiv: string;

  opportunities$: Array<OpportunityI>;

  open(content) {
    //console.log(this.description);
    this.opportunities$ = new Array();
    try {
      this.opportunities.forEach(element => {
        let item$ = this.dataSvc.getOpportunity(element);
        item$.subscribe(obsItem => {
          this.opportunities$.push(obsItem);
        });
      });
    } catch (error) {
      console.log(error);
    }
    this.description = this.description.replace("&#34;", "\"");
    //console.log(this.linkPath);
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
    if (this.linkPath != '') {
      this.router.navigate([this.linkPath]);
    }
  }

}
