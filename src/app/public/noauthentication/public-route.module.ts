import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { NoauthenticationComponent } from './noauthentication.component';
export const Public_Routes: Routes = [
  { path: '', component: NoauthenticationComponent,},
];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class PublicRouteModule { }
