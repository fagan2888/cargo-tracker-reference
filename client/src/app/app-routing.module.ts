import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MsalGuard } from '@azure/msal-angular';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: HomeComponent },
  {
    path: 'grades',
    data: { title: 'Grades' },
    canActivate: [ MsalGuard ],
    loadChildren: () => import('./grades/grades.module').then(m => m.GradesModule)
  },
  {
    path: 'countries', data: { title: 'Countries' },
    canActivate: [ MsalGuard ],
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
  },
  {
    path: 'terminals', data: { title: 'Terminals' },
    canActivate: [ MsalGuard ],
    loadChildren: () => import('./terminals/terminals.module').then(m => m.TerminalsModule)
  },
  {
    path: 'companies', data: { title: 'Companies' },
    canActivate: [ MsalGuard ],
    loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule)
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
