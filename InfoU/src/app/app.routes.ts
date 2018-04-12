import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OportunidadesComponent } from './oportunidades/oportunidades.component';
import { HistoriasDeExitoComponent } from './historias-de-exito/historias-de-exito.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { NuestraInvestigacionComponent } from './nuestra-investigacion/nuestra-investigacion.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const appRoutes: Routes =  [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'oportunidades', component: OportunidadesComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'historias-de-exito', component: HistoriasDeExitoComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'encuesta1', component: NuestraInvestigacionComponent }
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);
