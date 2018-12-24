import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Http, RequestOptions ,Headers} from '@angular/http'; 
@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  headers: Headers;
  options: RequestOptions;
  isLibraryAdmin : boolean;
  constructor(private http: Http) {   
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('accept', 'application/json');
    this.options = new RequestOptions({ headers: this.headers ,withCredentials: true });
  }

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let result;        
         return this.http.get(environment.base_Url+'/api/AuthenticateUser',this.options).toPromise().then(res=>{
          result = res.json();
          this.isLibraryAdmin = result.isLibraryAdmin;       
          localStorage.setItem('isAdmin',result.isLibraryAdmin);
          return  result.isLibraryAdmin;
        }).catch(err => {
          console.error(err); 
           return false;
    });
}
}
