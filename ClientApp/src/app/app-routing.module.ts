import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'pharm',
    pathMatch: 'full'
  },
  {
     path: 'pharm', 
     loadChildren: () => import('./pharm/pharm.module').then(m => m.PharmModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
