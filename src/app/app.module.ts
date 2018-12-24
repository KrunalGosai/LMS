import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BookDetailsService } from '../services/book-details.service';
import { BookAddingService } from '../services/book-adding.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { StarRatingModule } from 'angular-star-rating';
import { BarRatingModule } from "ngx-bar-rating";
import { AppRoutingModule } from './app-routing.module';
import { NoauthenticationComponent } from './public/noauthentication/noauthentication.component';
import { DashbordComponent } from './Secure/dashbord/dashbord.component';
import { FooterComponent } from './Secure/footer/footer.component';
import { HeaderComponent } from './Secure/header/header.component';
import { BookDetailsComponent } from './Secure/book-details/book-details.component';
import { BookListingComponent } from './Secure/book-listing/book-listing.component';
import { BookAddingComponent } from './Secure/book-adding/book-adding.component';
import { BookReturnDetailsComponent } from './Secure/book-return-details/book-return-details.component';
import { AllBookDetailsComponent } from './Secure/all-book-details/all-book-details.component';
import { NavigationComponent } from './Secure/navigation/navigation.component';
import { SearchUsingQueriesComponent } from './Secure/search-using-queries/search-using-queries.component';
import { SearchLayoutComponent } from './Secure/search-layout/search-layout.component';
import { WithoutSearchLayoutComponent } from './Secure/without-search-layout/without-search-layout.component';
import { DonateComponent } from 'src/app/Secure/donate/donate.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AdminDashComponent } from './Secure/admin-dash/admin-dash.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { BookItemComponent } from './Secure/book-listing/book-item/book-item.component';
import { CommonService } from 'src/services/common.service';
@NgModule({
  declarations: [
    AppComponent,
     FooterComponent,
     HeaderComponent,
    DashbordComponent,
    SearchUsingQueriesComponent,
    BookDetailsComponent,
    BookListingComponent,
    BookAddingComponent,     
    BookReturnDetailsComponent,      
BookReturnDetailsComponent, AllBookDetailsComponent, NavigationComponent, NoauthenticationComponent,
 SearchLayoutComponent,
 WithoutSearchLayoutComponent,
 DonateComponent,
 AdminDashComponent,
 LoaderComponent,
 BookItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule  ,     
    StarRatingModule.forRoot(),
    BarRatingModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  providers: [BookDetailsService,LoaderService,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
