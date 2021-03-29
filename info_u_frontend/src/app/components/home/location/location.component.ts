import { Component, OnInit, HostListener } from '@angular/core';
import { GetDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public innerWidth: any;
  slideConfig: any;
  title = '¿Por qué Palín?';
  description = 'El municipio a destacado nacionalmente en los últimos años. Además el sector industrial lo prefiere por su ubiación';
  info$;

  constructor(private dataSvc: GetDataService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.universities(this.innerWidth);
    this.info$ = this.dataSvc.getHistories();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.universities(this.innerWidth);
  }

  universities(innerWidth: number) {
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
