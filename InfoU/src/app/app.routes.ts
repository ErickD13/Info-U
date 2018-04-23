import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OportunidadesComponent } from './oportunidades/oportunidades.component';
import { HistoriasDeExitoComponent } from './historias-de-exito/historias-de-exito.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { NuestraInvestigacionComponent } from './nuestra-investigacion/nuestra-investigacion.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Resultado1Component } from './resultado1/resultado1.component';

const appRoutes: Routes =  [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'oportunidades', redirectTo: '/oportunidades', pathMatch: 'full' },
  { path: 'historias-de-exito', redirectTo: '/historias-de-exito', pathMatch: 'full' },
  { path: 'sobre-nosotros', redirectTo: '/sobre-nosotros', pathMatch: 'full' },
  { path: 'encuesta1', redirectTo: '/encuesta1', pathMatch: 'full' },
  { path: 'oportunidades', component: OportunidadesComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'historias-de-exito', component: HistoriasDeExitoComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'encuesta1', component: NuestraInvestigacionComponent },
  { path: 'resultado1', component: Resultado1Component },
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
