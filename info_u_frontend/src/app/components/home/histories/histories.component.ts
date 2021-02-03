import { Component, OnInit, HostListener } from '@angular/core';
import { HistoryI } from 'src/app/shared/models/history.interface';
import { Observable } from 'rxjs';
import { GetDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.css']
})
export class HistoriesComponent implements OnInit {

  public innerWidth: any;
  slideConfig: any;
  title = 'Historias de éxito';
  description = 'En caso de que aún te falte motivación, aprede sobre lo que han logrado muchos guatemaltecos, es realmente increíble';
  histories$: Observable<HistoryI[]>;

  constructor(private dataSvc: GetDataService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.histories(this.innerWidth);
    let item: HistoryI;
    this.histories$ = this.dataSvc.getHistories();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.histories(this.innerWidth);
  }

  histories(innerWidth: number) {
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
