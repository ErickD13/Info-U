import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { HomeComponent } from './home/home.component';
import { OportunidadesComponent } from './oportunidades/oportunidades.component';
import { HistoriasDeExitoComponent } from './historias-de-exito/historias-de-exito.component';
import { Routes, RouterModule } from '@angular/router';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { NuestraInvestigacionComponent } from './nuestra-investigacion/nuestra-investigacion.component';

const appRoutes: Routes =  [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'oportunidades', component: OportunidadesComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'historias-de-exito', component: HistoriasDeExitoComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'encuesta1', component: NuestraInvestigacionComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OportunidadesComponent,
    HistoriasDeExitoComponent,
    SobreNosotrosComponent,
    NuestraInvestigacionComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
