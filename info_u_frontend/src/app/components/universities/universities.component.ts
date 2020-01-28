import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemI } from 'src/app/shared/models/item.interface';
import { GetDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css']
})
export class UniversitiesComponent implements OnInit {

  public innerWidth: any;
  slideConfig: any;
  title = 'Elige tu universidad';
  description = 'Existen 14 universidades en el país con gran variedad de carreras';
  universities$: Observable<ItemI[]>;

  constructor(private dataSvc: GetDataService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.universities(this.innerWidth);
    let item: ItemI;
    this.universities$ = this.dataSvc.getUniversities();
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
