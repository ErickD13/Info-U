import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, AfterViewInit, HostListener, Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { PageScrollService } from 'ngx-page-scroll-core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ItemI } from 'src/app/shared/models/item.interface';
import { GetDataService } from 'src/app/shared/services/get-data.service';
import { Navigation } from 'src/app/shared/singleton/navigation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  constructor(private itemSvc: GetDataService, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any, private spinner: NgxSpinnerService) {}
  
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "autoplay": true,
    "autoplaySpeed": 2000
  };

  lottie_options: AnimationOptions = {
    path: 'https://assets6.lottiefiles.com/packages/lf20_uzoyW6.json'
  };
  
  public zoomEnabled: boolean;
  public carousel$: Observable<ItemI[]>;
  public title = 'Info U';
  public description = `Info U es el sitio ideal para informarte, motivarte y darte cuenta de que lo puedes lograr.
  \nAquí podrás encontrar todo tipo de información de interés para guíarte y darte cuenta que la eduación superior en Guatemala sí es posible.
  \nSolo se necesita dedicación.`
  public question = `¿Entonces cómo voy a la U?`;
  
  //images
  public down_arrow = 'https://firebasestorage.googleapis.com/v0/b/info-u-gt.appspot.com/o/general%2Farrow_down.png?alt=media&token=6b39f833-dcb8-4747-a744-2f37972809d1';

  ngOnInit() {
    this.carousel$ = this.itemSvc.getCarousel();
    if(window.innerWidth <= 500){
      this.zoomEnabled = true;
    }else{
      this.zoomEnabled = false;
    }
  }

  ngAfterViewChecked() {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: Navigation.current_div
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth <= 500){
      this.zoomEnabled = true;
    }else{
      this.zoomEnabled = false;
    }
  }

}
