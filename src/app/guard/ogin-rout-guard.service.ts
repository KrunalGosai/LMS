import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BookDetailsService } from '../../services/book-details.service';
import { environment } from '../../environments/environment';
import { Http, RequestOptions ,Headers} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class OginRoutGuardService implements CanActivate{
  headers: Headers;
  options: RequestOptions;
isAuthenticated : boolean;
  constructor(private http: Http) {   
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('accept', 'application/json');
    this.options = new RequestOptions({ headers: this.headers ,withCredentials: true });
  }

  canActivate() {
    let result;    
     return this.http.get(environment.base_Url+'/api/AuthenticateUser',this.options).toPromise().then(res=>{
      result = res.json();
      this.isAuthenticated = result.isAuthenticated;
      console.log(result.isAuthenticated);
        localStorage.setItem('currentUser',result.username);
       localStorage.setItem('isAdmin',result.isLibraryAdmin);
      return  result.isAuthenticated;
    }).catch(err => {
      console.error(err); 
      return false;})
  }


}
