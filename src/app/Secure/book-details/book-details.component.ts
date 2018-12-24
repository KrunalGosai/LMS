import { Component, OnInit } from '@angular/core';
import { BookDetails } from '../../../model/book-details';
import { BookDetailsService } from '../../../services/book-details.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import {dateFormat} from 'dateformat';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  commentForm: FormGroup;
  bookComments: any[] = [];
  currentBookDetails: BookDetails = {};
  submitted = false;
  totalReview: number = 0;
  issueBookPortion = false;
  todayDate: Date = new Date();
  dueDate: Date = new Date();
  book_Id: number;
  borrowBookButton = false;
  bookDetails: BookDetails[];
  showModel: boolean = false;
  bookHisoryData: any[] = [];
  rates: number = 0;
  plainText:string="";
  get isAdmin() {
    return localStorage.isAdmin;
  }

  constructor(private router: Router, private bookdetailsService: BookDetailsService, 
    private toastr: ToastrService, private route: ActivatedRoute, 
    private formBuilder: FormBuilder, private spinner: LoaderService) {
    this.book_Id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    //shows the spinner while initialization
    let currentDate : Date = new Date();
 
    for(var i=0;i<15;){    //looping through days in month
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate = new Date(currentDate);
      //environment.publicHolidays.find(new Date(currentDate));
      // var indexNum =environment.publicHolidays.findIndex((element)=> {
      //   return (element == currentDate);
      // });
      if(currentDate.getDay() !=0 && currentDate.getDay() !=6){   //if Sunday
        this.dueDate = currentDate;
        console.log(this.dueDate);
        i++;
      }
  }
    if (this.book_Id != null) {
      this.getBookDetailFromUser(this.book_Id);
    }
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }
  get f() { return this.commentForm.controls; }
  get getuserName() {
    return localStorage['currentUser'];
  }
  getBookDetailFromUser(book_Id) {
    this.spinner.show();
    let result;
    let commentResult;
    this.bookdetailsService.getBookDetailFromBookId(book_Id).toPromise().then(res => {
      result = res.json();
      if (result.bookbyid[0] != null) {
        this.currentBookDetails = result.bookbyid[0];
        console.log(this.currentBookDetails);
        this.plainText = this.currentBookDetails.book_description.replace(/<[^>]*>/g, '');
        this.plainText=this.plainText.replace(/&nbsp;/g," ");
        this.plainText=this.plainText.replace(/&ndash;/g," ");
        this.plainText=this.plainText.replace(/&#39;/g,"'");
        
        // if(this.currentBookDetails.bookStatusDisplayName == 'Requested'){ 
        this.spinner.hide();
        // if (this.currentBookDetails.bookStatusDisplayName == 'Requested' || this.currentBookDetails.bookStatusDisplayName == 'Issued' || this.currentBookDetails.bookStatusDisplayName == 'Deleted')
        if (this.currentBookDetails.book_quntity_available <= 0) {
          this.borrowBookButton = false;
        } else this.borrowBookButton = true;
        if(this.currentBookDetails.is_visible == false){
          this.toastr.info("Book is not available")
          this.router.navigateByUrl('')
        }
      }
    }).catch(err => { this.spinner.hide(); console.log(err) });
    this.bookdetailsService.getAllCommentsFromBookId(book_Id).toPromise().then(res => {
      commentResult = res.json();
      console.log(commentResult.commentlist);
      if (commentResult.commentlist != null) {
        this.bookComments = commentResult.commentlist;
        this.totalReview = this.bookComments.length;
      }
      // this.spinner.hide();
    }).catch(err => console.log(err));
  }

  issueBookShow() {
    this.issueBookPortion = true;
    this.submitted=false;
    this.ngOnInit();
  }
  showSuccess(msg) {
    this.toastr.success(msg, 'Success!');
  }
  showError(msg) {
    this.toastr.error(msg, 'Error!');
  }

  issueBook(userId) {
    this.spinner.show();
    this.submitted=false;
    let result;
    this.bookdetailsService.issueBook(userId, this.book_Id, "1", this.todayDate, this.dueDate).toPromise().then(res => {
      result = res.json();
      this.spinner.hide();
      this.ngOnInit();
      if (result.status_code == 200) {
        this.issueBookPortion = false;
        this.showSuccess("You have requested for book");
      }
      else if(result.message == "Book Already Requested!"){
        this.issueBookPortion = false;
        this.toastr.warning(result.message);
      }
      else {
        this.showError("Please try again something went wrong");
      }
    }).catch(err => { console.error(err); this.spinner.hide(); })

    //setTimeout(() => {
    //this.spinner.hide();
    //}, 5000);
  }

  onCommentSubmit(commentDescription: HTMLInputElement, rating, bookId, userId) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return;
    }
    else {
      let result;
      let addCommentStatusCode = 0;
      console.log(rating);
      this.spinner.show();
      this.bookdetailsService.AddEveryCommentsDetails(commentDescription.value, rating, bookId, userId).toPromise().then(res => {
        result = res.json();
        if (result.status_code == "200") {
          addCommentStatusCode = 200;
          commentDescription.value = "";
          this.showSuccess("Comment added sucessfully")
          //  this.getIssuedBookDetails(this.user_Id);
          this.bookdetailsService.getAllCommentsFromBookId(this.book_Id).toPromise().then(res => {
            var commentResult = res.json();
            console.log(commentResult.commentlist);
            if (commentResult.commentlist != null) {
              this.bookComments = commentResult.commentlist;
              this.totalReview = this.bookComments.length;
            }
            this.spinner.hide();
            this.submitted=false;
          }).catch(err => {
            console.log(err)
            this.showError("Something went wrong In add comment")
            this.spinner.hide();
            this.submitted=false;
          });

        }
        else {
          this.showError("Something went wrong In add comment")
          this.spinner.hide();
          this.submitted=false;
        }
      }).catch(err => {
        console.error(err)
        this.showError("Something went wrong in add comment")
        this.spinner.hide();
        this.submitted=false;
      });

      // Clears the ratings after submitting the comment
      this.rates = 0;
      // setTimeout(() => {
      //   /** spinner ends after 5 seconds */
      //   this.spinner.hide();
      // }, 5000);
    }

  }

  closeHistoryDialog() {
    this.showModel = false;
  }

  showHistoryDialog() {
    this.spinner.show();
    this.bookdetailsService.getBookHistory(this.book_Id).then(res => {
      this.showModel = true;
      if (res.json().getallissuelistdata && res.json().getallissuelistdata.length > 0) {
        this.bookHisoryData = res.json().getallissuelistdata;
      }
      else {
        this.bookHisoryData = [];
      }
      this.spinner.hide()
    }).catch(err => {
      this.showError("Please try again something went wrong");
      this.spinner.hide()
    })
  }
}
