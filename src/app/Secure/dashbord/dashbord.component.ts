import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../../../services/book-details.service';
import { BookDetails } from '../../../model/book-details';
import { FilterBookCategories } from '../../../model/filter-book-categories';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
  providers: []
})
export class DashbordComponent implements OnInit {
  constructor(private router: Router, private bookdetailsService: BookDetailsService, private spinner: LoaderService, private objCommonService:CommonService) { }
  latestBookDetails: BookDetails[] = [];
  topRatedBookDetails: BookDetails[] = [];
  bookfilterCategoryList: Array<FilterBookCategories> = [];
  href: string;

  //bookDetails:any
  ngOnInit() {
    this.objCommonService.clearSearchtxt();
    this.spinner.show();
    this.authentication();
    this.bookfilterCategoryList = [{
      filter_Category_Title: "Top Rated",
      filter_Category_Elements: 5
    },
    {
      filter_Category_Title: "Latest",
      filter_Category_Elements: 5
    }]

    this.getBookDetail(this.bookfilterCategoryList);
  }

  imageError(event) {
    event.target.src = './../../../assets/Images/default_book_cover.jpg';
  }

  getBookDetail(bookfilterCategoryList) {
    let result;
    this.bookdetailsService.getBookDetails(bookfilterCategoryList).toPromise().then(res => {
      result = res.json().bookresponse;
      this.latestBookDetails = result.filter(item => item.filter_Category_Title == "Latest")[0].booklist;
      this.topRatedBookDetails = result.filter(item => item.filter_Category_Title == "Top Rated")[0].booklist;
      this.spinner.hide();
      //setTimeout(()=>{    this.spinner.hide(); }, 2000);
    }).catch(err => console.error(err))
  }
  authentication() {
    let result;
    //return true;
    //   this.bookdetailsService.authentication().toPromise().then(res=>{
    //     result = res;
    //     console.log(result);
    //   }).catch(err => console.error(err))
  }
}
