import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <MODEL_CAPITALIZED>RoutingModule } from './<MODEL>-routing.module';
import { <MODEL_CAPITALIZED>Component } from './<MODEL>.component';
import { RestAdminModule } from '@yca/rest-admin';

@NgModule({
  imports: [
    CommonModule,
    <MODEL_CAPITALIZED>RoutingModule,
    RestAdminModule.forRoot()
  ],
  declarations: [<MODEL_CAPITALIZED>Component]
})
export class <MODEL_CAPITALIZED>Module { }
