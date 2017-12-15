import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { <MODEL_CAPITALIZED>Component } from '../<MODEL>/<MODEL>.component';

const routes: Routes = [
  {
    path: '',
    component: <MODEL_CAPITALIZED>Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <MODEL_CAPITALIZED>RoutingModule { }
