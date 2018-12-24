import { Injectable } from '@angular/core';
import { BookDetails } from '../model/book-details';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
//import { Observable } from '../../node_modules/rxjs/internal/Observable';
//import { Observable} from '../../node_modules/rxjs/add/operator/map';
//import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Observable, of } from 'rxjs';
import { FilterBookCategories } from '../model/filter-book-categories';
import { BookListing } from '../model/book-listing';
import { HttpClient } from '@angular/common/http';
import { BookAdd } from '../model/book-adding';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookAddingService {

  headers: Headers;
  options: RequestOptions;
  bookDetailsArray: BookDetails[] = [];

  constructor(private http: Http) {
    this.headers = new Headers();

    this.headers.append('Content-Type', 'application/json');

    this.options = new RequestOptions({ headers: this.headers });
  }

  addBook(bookTitle, bookDescription, bookAuthor, bookDonner, bookStatus, bookCategory,fileURL,quntity) {
    const uri = environment.base_Url+'/api/postBookDetails';
    const obj = {
      book_title: bookTitle,
      book_description: bookDescription,
      author_name: bookAuthor,
      Donner: bookDonner,
      book_Status: bookStatus,
      category_Name: bookCategory,
      book_cover_image: fileURL,
      quntity:quntity
    };
    console.log(obj);   
    return this.http.post(uri, obj)    
  }

  sendMail(txtTo,txtCc, txtMessage) {
    const uri = environment.base_Url+'/api/PostEmailDetails';
    const obj = {
      To: txtTo,
      CC: txtCc,
      message: txtMessage,     
    };
    console.log(obj);
    return  this.http.post(uri, obj);
  }


  updateBook(bookTitle, bookDescription, bookAuthor,bookDonner,bookStatus,bookCategory,quntity, bookImage,id,requestedBy) {
    const obj = {
      book_title: bookTitle,
      book_description: bookDescription,
      author_name: bookAuthor,
      Donner: bookDonner,
      book_Status: bookStatus,
      category_Name: bookCategory,
      quntity : quntity,
      book_cover_image: bookImage,
      ID :id,
      requestedBy:requestedBy
    };
    
    return this.http.post(environment.base_Url+'/api/UpdateBookDetails', obj)
      // .subscribe(res => console.log('Done'));
  }

  addImage(imageInput:File): Observable<any> {
    const uri = environment.base_Url+'/api/UploadImage';
    const formData : FormData = new FormData();
    formData.append("image", new Blob([imageInput]), imageInput.name);    
    return this.http.post(uri, formData);
  }


  deleteBook(ID) {
    return this.http.get(environment.base_Url+'/api/DeleteBook/' + ID);        
  }
 
  getBookStatus(): Observable<any> {
    return this.http.get(environment.base_Url+'/api/GetBookStatus/');
  }

  getBookCategory(): Observable<any> {
    return this.http.get(environment.base_Url+'/api/GetAllBooksCategory/');
  }

  getBookDetailForAdmin(search, orderby, category): Observable<any> {
    return this.http.post(environment.base_Url+'/api/GetBooksBySearch/', this.options);

  }

  getBookDeatailForEdit(id) {
    return this.http.get(environment.base_Url+'/api/GetBookDetailFromBookId/' + id);
  }
  getBookDeatailonFilter(bookStatus,bookSearchByName) {
    return this.http.post(environment.base_Url + '/api/GetBookDeatailonFilter?bookStatus=' + bookStatus+'&searchByName='+bookSearchByName, this.options);
  }
  changeBookStatus(requestResult,requestedBy,bookid) {
    let body = {
      bookStatus :requestResult,
      requestedBy:requestedBy,
      bookId:bookid
    }
    return this.http.post(environment.base_Url + '/api/ChangeBookStatus/',body, this.options);
  }

  getAllBookDetails() {
    return this.http.get(environment.base_Url+'/api/GetAllBookDetails');
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  private extractData(res: Response) {
    console.log(res);
    return res || {};
  }
}
