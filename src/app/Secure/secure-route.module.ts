import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './dashbord/dashbord.component';
import { Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListingComponent } from './book-listing/book-listing.component';
import { BookAddingComponent } from './book-adding/book-adding.component';
import { BookReturnDetailsComponent } from './book-return-details/book-return-details.component';
import { AllBookDetailsComponent } from './all-book-details/all-book-details.component';
import { OginRoutGuardService } from '../guard/ogin-rout-guard.service';
import { SearchUsingQueriesComponent } from './search-using-queries/search-using-queries.component';
import { SearchLayoutComponent } from './search-layout/search-layout.component';
import { WithoutSearchLayoutComponent } from './without-search-layout/without-search-layout.component';
import { DonateComponent } from 'src/app/Secure/donate/donate.component';
import { AdminGuard } from '../auth/admin.guard';
import { AdminDashComponent } from '../Secure/admin-dash/admin-dash.component';
export const Secure_Routes: Routes = [
  {
    path: '',
    component: SearchLayoutComponent,
    children: [
      { path: '', component: DashbordComponent, canActivate: [OginRoutGuardService] },
      { path: 'search-using-queries/:sorting/:category/:searchtxt', component: SearchUsingQueriesComponent },
      { path: 'search-using-queries/:sorting/:category', component: SearchUsingQueriesComponent },
      { path: 'search-using-queries', component: SearchUsingQueriesComponent },
      { path: 'all-book-details/:category', component: AllBookDetailsComponent }
    ]
  },
  {
    path: '',
    component: WithoutSearchLayoutComponent,
    children: [
      { path: 'admin/book-listing', component: BookListingComponent, canActivate: [AdminGuard] },
      { path: 'admin/book-adding', component: BookAddingComponent, canActivate: [AdminGuard] },
      { path: 'book-update/:id', component: BookAddingComponent, canActivate: [AdminGuard] },
      { path: 'admin-dash', component: AdminDashComponent, canActivate: [AdminGuard] },
      { path: 'book-return/:id', component: BookReturnDetailsComponent },
      { path: 'book-details/:id', component: BookDetailsComponent },
      { path: 'donate', component: DonateComponent }
    ]
  },

];
@NgModule({
  imports: [
    CommonModule
  ],

})
export class SecureRouteModule { }
