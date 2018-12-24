import { Injectable } from '@angular/core';
import { BookDetails } from '../model/book-details';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  headers: Headers;
  options: RequestOptions;
  options1: RequestOptions;
  bookDetailsArray: BookDetails[] = [];


  constructor(private http: Http) {
    this.headers = new Headers();

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('accept', 'application/json');
    this.options = new RequestOptions({ headers: this.headers });
    this.options1 = new RequestOptions({ headers: this.headers, withCredentials: true });
  }
  
  getBookDetails(bookfilterCategoryList): Observable<any> {
    let body = JSON.stringify(bookfilterCategoryList);
    return this.http.post(environment.base_Url + '/api/getBookDetails', body, this.options)
  }

  getBookDetailFromBookId(id): Observable<any> {
    return this.http.get(environment.base_Url + '/api/GetBookDetailFromBookId/' + id);

  }
  getAllCommentsFromBookId(id): Observable<any> {
    return this.http.get(environment.base_Url + '/api/GetComments/' + id);

  }
  addComments(comments, rating, book_id, user_id) {
    let body = JSON.stringify({
      Comments: comments,
      Rating: rating,
      Book_id: parseInt(book_id),
      User_id: user_id
    })
    console.log(body);
    return this.http.post(environment.base_Url + '/api/AddComments', body, this.options)
  }
  AddEveryCommentsDetails(comments, rating, book_id, user_id) {
    let body = JSON.stringify({
      Comments: comments,
      Rating: rating,
      Book_id: parseInt(book_id),
      User_id: user_id
    })
    console.log(body);
    return this.http.post(environment.base_Url + '/api/AddEveryCommentsDetails', body, this.options)
  }
  
  issueBook(userId, bookId, book_status, issueDate, dueDate) {
    let body = JSON.stringify({
      user_id: userId,
      book_id: bookId,
      book_status: book_status,
      issueDate: issueDate,
      dueDate: dueDate
    })
    console.log(body);
    return this.http.post(environment.base_Url + '/api/PostIssueDetails', body, this.options)
  }

  getGetegories() {
    return this.http.get(environment.base_Url + '/api/GetAllBooksCategory')
  }
  searchBookDetails(searchtxt, sorting, category) {
    let body = {
      search: searchtxt,
      orderby: sorting,
      category: category
    };
    console.log(body);
    return this.http.post(environment.base_Url + '/api/GetBooksBySearch?search=' + searchtxt + '&orderby=' + sorting + '&category=' + category, this.options)
  }

  getIssuedBookDetails(userid) {
    return this.http.get(environment.base_Url + '/api/GetIssueBookListByUserId/' + userid)
  }

  sendNotification(body) {
    return this.http.post(environment.base_Url + '/api/PostEmailDetails', JSON.stringify(body), this.options);
  }
  authentication() {
    return this.http.get(environment.base_Url + '/api/AuthenticateUser', this.options1);
  }

  getBookHistory(bookid){
    return this.http.get(environment.base_Url + `/api/GetBookHistry?id=${bookid}`, this.options1).toPromise();
  }

  getAvailableBooks(){
    return this.http.post(environment.base_Url + '/api/GetAvailableBooks','{}', this.options1).toPromise();
  }

    

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  private extractData(res: Response) {
    console.log(res);
    return res || {};
  }

}