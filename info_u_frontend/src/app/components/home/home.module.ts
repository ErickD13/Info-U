import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HistoriesComponent } from './histories/histories.component';
import { OportunitiesComponent } from './opportunities/opportunities.component';
import { ResearchComponent } from './research/research.component';
import { UniversitiesComponent } from './universities/universities.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { LottieModule } from 'ngx-lottie';
import { playerFactory } from 'src/app/app.module';
import { ModalCarouselComponent } from '../modals/modal-carousel/modal-carousel.component';
import { ModalHistoryComponent } from '../modals/modal-history/modal-history.component';
import { ModalOpportunityComponent } from '../modals/modal-opportunity/modal-opportunity.component';
import { ModalResearchComponent } from '../modals/modal-research/modal-research.component';
import { ModalUniversityComponent } from '../modals/modal-university/modal-university.component';

@NgModule({
  declarations: [
    HomeComponent,
    UniversitiesComponent,
    OportunitiesComponent,
    HistoriesComponent,
    ResearchComponent,
    ModalCarouselComponent,
    ModalHistoryComponent,
    ModalUniversityComponent,
    ModalResearchComponent,
    ModalOpportunityComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SlickCarouselModule,
    LottieModule.forRoot({ player: playerFactory }),
  ]
})

export class HomeModule { }
