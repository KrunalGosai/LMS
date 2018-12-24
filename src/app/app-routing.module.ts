import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { OginRoutGuardService } from './guard/ogin-rout-guard.service';
import { Secure_Routes } from './Secure/secure-route.module';

const routes: Routes = [
  // { path: '',children: Public_Routes},
  { path: '',canActivate: [OginRoutGuardService],children: Secure_Routes}, 
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
 }
