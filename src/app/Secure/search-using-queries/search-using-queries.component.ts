import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetailsService } from '../../../services/book-details.service';
import { BookDetails } from '../../../model/book-details';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-search-using-queries',
  templateUrl: './search-using-queries.component.html',
  styleUrls: ['./search-using-queries.component.css']
})
export class SearchUsingQueriesComponent implements OnInit {
  searchtxt: string;
  sorting: string;
  category: string;
  bookDetails: BookDetails[];
  isShowNoData:boolean = true;

  constructor(private route: ActivatedRoute, private bookdetailsService: BookDetailsService, private spinner: LoaderService, private toastr: ToastrService) {

    this.route.params.subscribe((params) => {
      if (Object.keys(params).length == 3) {
        this.searchtxt = this.route.snapshot.params.searchtxt;
      }
      else {
        this.searchtxt = '';
      }
      this.sorting = this.route.snapshot.params.sorting;
      this.category = this.route.snapshot.params.category;
      //this.searchBookDetails();

      this.spinner.show();
      this.searchBookDetails();
      // setTimeout(() => {
      // /* spinner ends after 5 seconds */
      // this.spinner.hide();
      // }, 9500);
    })
  }

  ngOnInit() {
    //  setTimeout(()=>{this.searchBookDetails();console.log( this.display );}, 2000);
    //  this.searchBookDetails();


    this.spinner.show();
    //this.searchBookDetails();
    //   setTimeout(() => {
    //   /* spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 9500);
  }

  imageError(event){
    event.target.src = './../../../assets/Images/default_book_cover.jpg';
  }

  searchBookDetails(){
    let result;
    this.isShowNoData = false;
    this.bookdetailsService.searchBookDetails(this.searchtxt,this.sorting,this.category).toPromise().then(res => {
    result= res.json();
    this.bookDetails = result.bookbyid;
    console.log("search book details");
    this.isShowNoData = true;
    this.spinner.hide();
    if(result.status_code == 400){
      this.toastr.info("No books found!", 'Info!');
    }  
    //setTimeout(()=>{    this.spinner.hide(); }, 4000);
    }).catch(err=>console.error(err))
  }
}
