import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from  '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card'; 
import {MatTabsModule} from '@angular/material/tabs';
import { PharmRoutingModule } from './pharm-routing.module';
import { PharmCrudComponent } from './pharm-crud/pharm-crud.component'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PharmCrudComponent],
  imports: [
    CommonModule,
    PharmRoutingModule, 
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule, 
    MatTabsModule,
    ReactiveFormsModule
    
  ]
})
export class PharmModule { }
