import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetailsService } from '../../../services/book-details.service';
import { CommonService } from '../../../services/common.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private bookdetailsService: BookDetailsService,private objCommonService:CommonService) { }
  searchtxt: string = "";
  sorting: string = "ASE";
  currentCategory: string = "All";
  categoryList: any[];
  ngOnInit() {
    
    this.objCommonService.searchtxt.subscribe(searchtxt => { this.searchtxt = searchtxt; });
    this.objCommonService.currentCategory.subscribe(currentCategory => { this.currentCategory = currentCategory.text;});
    this.getCategories();
  }
  navigateToShort() {
    if (this.sorting == "ASE") {
      this.sorting = "DESC";
    }
    else {
      this.sorting = "ASE";
    }
    if (this.searchtxt == "" || !this.searchtxt) {
      this.router.navigate(['search-using-queries', this.sorting, this.currentCategory]);
    }
    else {
      this.router.navigate(['search-using-queries', this.sorting, this.currentCategory, this.searchtxt]);
    }
  }
  navigateToSearch() {    
    this.router.navigate(['search-using-queries', this.sorting, this.currentCategory, this.searchtxt]);
  }
  isNeedAnchorTagDisabled(): boolean {
    console.log("search", this.searchtxt.length);
    return this.searchtxt.length == 0 ? false : true;
  }
  navigateToCategory(category) {
    this.currentCategory = category;
    if (this.searchtxt == "" || !this.searchtxt) {
      this.router.navigate(['search-using-queries', this.sorting, this.currentCategory]);
    }
    else {
      this.router.navigate(['search-using-queries', this.sorting, this.currentCategory, this.searchtxt]);
    }
  }
  
  toggleDropDown(){
      console.log("dropdown button clicked")  ;

  }
  getCategories() {
    let result;
    this.bookdetailsService.getGetegories().toPromise().then(res => {
      result = res.json();
      this.categoryList = result.categorylist;
    }).catch(err => console.error(err))
  }
}
