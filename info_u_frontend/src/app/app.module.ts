// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from 'ngx-spinner';

// Firebase
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorage, AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';

// Lottie
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Page404Component } from './components/page404/page404.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocationComponent } from './components/location/location.component';
import { NgbdModalBasic } from './components/modals/modal-basic/modal-basic';
import { AngularFireAuth } from '@angular/fire/auth';
import { PolicyComponent } from './components/legal/policy/policy.component';
import { TermsComponent } from './components/legal/terms/terms.component';
import { DndDirective } from './shared/directives/dnd.directive';
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Note we need a separate function as it's required
// by the AOT compiler
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Page404Component,
    NgbdModalBasic,
    FooterComponent,
    LocationComponent,
    PolicyComponent,
    TermsComponent,
    DndDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFirestoreModule,
    NgbModule,
    NgxPageScrollModule,
    BrowserAnimationsModule,
    NgxImageZoomModule.forRoot(),
    SlickCarouselModule,
    LottieModule.forRoot({ player: playerFactory }),
    ImageCropperModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireStorage,
    {provide: StorageBucket, useValue: 'gs://info-u-gt.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
