import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../../../services/book-details.service';
import { FilterBookCategories } from '../../../model/filter-book-categories';
import { BookDetails } from '../../../model/book-details';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-all-book-details',
  templateUrl: './all-book-details.component.html',
  styleUrls: ['./all-book-details.component.css']
})
export class AllBookDetailsComponent implements OnInit {
  bookDetails: BookDetails[];
  bookfilterCategoryList: Array<FilterBookCategories> = []
  category: string = "";
  constructor(private bookdetailsService: BookDetailsService, private route: ActivatedRoute, private spinner: LoaderService) {
    this.category = this.route.snapshot.params.category;
  }

  ngOnInit() {
    //shows spinner on page initialization
    this.spinner.show();
    this.bookfilterCategoryList = [{
      filter_Category_Title: this.category,
      filter_Category_Elements: 50
    }]
    this.getBookDetail(this.bookfilterCategoryList);
  }

  imageError(event){
    event.target.src = './../../../assets/Images/default_book_cover.jpg';
  }
  
  getBookDetail(bookfilterCategoryList) {
    let result;
    this.bookdetailsService.getBookDetails(bookfilterCategoryList).toPromise().then(res => {
      result = res.json().bookresponse;
      console.log(result);
      this.bookDetails = result[0].booklist;
      //hides spinner when data loading completes
      this.spinner.hide();

      //for testing whether the loading indicator works or not
      //setTimeout(()=>{    this.spinner.hide(); }, 2000);
    }).catch(err => console.error(err))
  }
}
