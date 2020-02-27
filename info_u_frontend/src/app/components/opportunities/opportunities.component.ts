import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { OpportunityI } from 'src/app/shared/models/opportunity';
import { GetDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css']
})
export class OportunitiesComponent implements OnInit {

  public innerWidth: any;
  slideConfig: any;
  title = 'Busca una opportunidad';
  description = 'En guatemala tenemos una universidad pública y además hay una gran variedad de becas, incluso ayuda social del gobierno, a continuación puedes apreciar algunas de las más importantes.';
  opportunities$: Observable<OpportunityI[]>;

  constructor(private dataSvc: GetDataService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.opportunities(this.innerWidth);
    let item: OpportunityI;
    this.opportunities$ = this.dataSvc.getOpportunities();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.opportunities(this.innerWidth);
  }

  opportunities(innerWidth: number) {
    if (innerWidth >= 0 && innerWidth <= 600) {
      this.slideConfig = {
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "dots": true,
        "autoplay": true,
        "autoplaySpeed": 2000
      };
    } else if (innerWidth > 600 && innerWidth <= 700) {
      this.slideConfig = {
        "slidesToShow": 2,
        "slidesToScroll": 1,
        "dots": true,
        "autoplay": true,
        "autoplaySpeed": 2000
      };
    } else {
      this.slideConfig = {
        "slidesToShow": 3,
        "slidesToScroll": 2,
        "dots": true,
        "autoplay": true,
        "autoplaySpeed": 2000
      };
    }
  }

}
