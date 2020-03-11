import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PharmCrudComponent } from './pharm-crud/pharm-crud.component';
import { ToolbarComponent } from '../layout/toolbar/toolbar.component';


const routes: Routes = [
  { path: "", component: PharmCrudComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmRoutingModule { }
