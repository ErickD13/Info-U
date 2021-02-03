import { Component, OnInit, HostListener } from '@angular/core';
import { GetDataService } from 'src/app/shared/services/get-data.service';
import { Observable } from 'rxjs';
import { ResearchI } from 'src/app/shared/models/research.interface';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  public innerWidth: any;
  slideConfig: any;
  title = 'Nuestra investigación';
  description = 'En Info U velamos porque todos los jovenes conozcan la importancia de una vida universitaria y las grandes oportunidades que existen para alcanzar sus objetivos';
  research$: Observable<ResearchI[]>;
  dashboard: any;
  location: any;
  surveys: any;

  constructor(private dataSvc: GetDataService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.research(this.innerWidth);
    this.research$ = this.dataSvc.getResearch();
    this.dashboard = this.research$[0];
    this.location = this.research$[1];
    this.surveys = this.research$[2];
    console.log('dashboard:', this.dashboard);
    console.log('location:', this.location);
    console.log('surveys:', this.surveys);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.research(this.innerWidth);
  }

  research(innerWidth: number) {
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
