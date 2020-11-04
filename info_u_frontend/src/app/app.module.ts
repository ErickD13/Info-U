import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { Page404Component } from './components/page404/page404.component';
import { NgbdModalBasic } from './components/modals/modal-basic/modal-basic';
import { ModalCarouselComponent } from './components/modals/modal-carousel/modal-carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxImageZoomModule } from 'ngx-image-zoom';

//Firebase
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { UniversitiesComponent } from './components/universities/universities.component';

//Lottie
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { OportunitiesComponent } from './components/opportunities/opportunities.component';
import { LocationComponent } from './components/location/location.component';
import { HistoriesComponent } from './components/histories/histories.component';
import { ResearchComponent } from './components/research/research.component';
import { ModalHistoryComponent } from './components/modals/modal-history/modal-history.component';
import { ModalUniversityComponent } from './components/modals/modal-university/modal-university.component';
import { ModalResearchComponent } from './components/modals/modal-research/modal-research.component';

// Note we need a separate function as it's required
// by the AOT compiler
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    Page404Component,
    NgbdModalBasic,
    FooterComponent,
    ModalCarouselComponent,
    UniversitiesComponent,
    OportunitiesComponent,
    LocationComponent,
    HistoriesComponent,
    ResearchComponent,
    ModalHistoryComponent,
    ModalUniversityComponent,
    ModalResearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFirestoreModule,
    FormsModule,
    NgbModule,
    NgxPageScrollCoreModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    NgxImageZoomModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [
    {provide: StorageBucket, useValue: 'gs://info-u.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
