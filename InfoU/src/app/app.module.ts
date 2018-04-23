import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { HomeComponent } from './home/home.component';
import { OportunidadesComponent } from './oportunidades/oportunidades.component';
import { HistoriasDeExitoComponent } from './historias-de-exito/historias-de-exito.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { NuestraInvestigacionComponent } from './nuestra-investigacion/nuestra-investigacion.component';
import { Resultado1Component } from './resultado1/resultado1.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OportunidadesComponent,
    HistoriasDeExitoComponent,
    SobreNosotrosComponent,
    NuestraInvestigacionComponent,
    Resultado1Component,
  ],
  imports: [
    routes,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
