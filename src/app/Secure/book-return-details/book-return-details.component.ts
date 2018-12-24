import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookDetailsService } from '../../../services/book-details.service';
import { Route, ActivatedRoute } from '@angular/router';
import { BookDetails } from '../../../model/book-details';
import { ToastrService } from 'ngx-toastr';
import { BookAddingService } from 'src/services/book-adding.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-book-return-details',
  templateUrl: './book-return-details.component.html',
  styleUrls: ['./book-return-details.component.css']
})
export class BookReturnDetailsComponent implements OnInit {
  commentForm: FormGroup;
  returbTypeForm: FormGroup;
  extendForm: FormGroup;
  renewForm: FormGroup;
  // returnType: string;
  returnResons: string = "Return";

  book_Id: 3;
  submitted = false;
  extendSubmitted = false;
  renewSubmitted = false;
  user_Id: string;
  bookDetails: BookDetails[];
  score: number = 0;
  displayRatingScore = 4;
  rates: number = 0;
  isShowNoData: boolean = true;
  constructor(private formBuilder: FormBuilder, private bookdetailsService: BookDetailsService, private bookAddingService: BookAddingService, public route: ActivatedRoute, private spinner: LoaderService, private toastr: ToastrService) {
    this.user_Id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    //shows spinner on initialization
    this.spinner.show();
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    this.returbTypeForm = this.formBuilder.group({
      returnType: ['', Validators.required]
    });
    this.extendForm = this.formBuilder.group({
      extendComment: ['', Validators.required]
    });
    this.renewForm = this.formBuilder.group({
      renewComment: ['', Validators.required]
    });
    this.getIssuedBookDetails(this.user_Id);
    //removed static timeout
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 10000);
  }
  // convenience getter for easy access to form fields
  get f() { return this.commentForm.controls; }
  get r() { return this.renewForm.controls; }
  get e() { return this.extendForm.controls; }

  onCommentSubmit(commentDescription: HTMLInputElement, rating, bookId, userId) {
    this.spinner.show();
    this.submitted = true;
    let sendNotification = {
      To: "support@binaryrepublik.com",
      CC: "support@binaryrepublik.com",
      message: "User has requested for return book please collect the book from authorized person",
      CreatedDate: Date.now()
    }
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      this.spinner.hide();
      return;
    }
    else {
      let result;
      let addCommentStatusCode = 0;
      console.log(rating);
      this.bookdetailsService.addComments(commentDescription.value, rating, bookId, userId).toPromise().then(res => {
        result = res.json();
        if (result.status_code == "200") {
          this.getIssuedBookDetails(this.user_Id);
          addCommentStatusCode = 200;
          commentDescription.value = "";
          this.showSuccess("Book has been return successfully")
          let sendNotificationResult;
          sendNotificationResult = this.bookdetailsService.sendNotification(sendNotification).toPromise().then(res => {
            sendNotificationResult = res.json();
            if (sendNotificationResult.status_code == "200") {

              // this.showSuccess("Mail has been sent successfully")
            }
            else {
              this.showError("Something went wrong In notification")
            }
          }).catch(err => {
            console.error(err)
            this.showError("Something went wrong please try again")
          });
          //Clears the rating stars after the comment has been submitted
          this.rates = 0;
          commentDescription.value = "";
        }
        else {
          this.showError("Something went wrong In book return")
          this.spinner.hide();
          //Clears the rating stars after the comment has been submitted
          this.rates = 0;
          commentDescription.value = "";
        }
        
      }).catch(err => {
        console.error(err)
        this.showError("Something went wrong please try again")
        this.spinner.hide();
        //Clears the rating stars after the comment has been submitted
        this.rates = 0;
        commentDescription.value = "";
      });
    }
  }

  onExtendCommentSubmit(extendCommentDescription: HTMLInputElement, bookId, userId) {
    this.extendSubmitted = true;
    console.log(this.extendForm);
    let sendNotification = {
      To: "support@binaryrepublik.com",
      CC: "support@binaryrepublik.com",
      message: "User has requested for extend book please do the needfull",
      CreatedDate: Date.now()
    }
    // stop here if form is invalid
    if (this.extendForm.invalid) {
      console.log(this.extendForm);
      return;
    }
    else {
      let result;
      let addCommentStatusCode = 0;
      this.spinner.show();
      // this.bookdetailsService.addComments(commentDescription.value, rating, bookId, userId).toPromise().then(res => {
      // result = res.json();
      // if (result.status_code == "200") {
      // addCommentStatusCode = 200;
      // commentDescription.value = "";
      // this.showSuccess("Book has been return successfully")
      // this.getIssuedBookDetails(this.user_Id);
      // }
      // else {
      // this.showError("Something went wrong In book return")
      // }
      // }).catch(err => {
      // console.error(err)
      // this.showError("Something went wrong please try again")
      // });
      let sendNotificationResult;
      sendNotificationResult = this.bookdetailsService.sendNotification(sendNotification).toPromise().then(res => {
        sendNotificationResult = res.json();
        if (sendNotificationResult.status_code == "200") {

          // this.showSuccess("Mail has been sent successfully")
        }
        else {
          this.showError("Something went wrong In notification")
        }
      }).catch(err => {
        console.error(err)
        this.showError("Something went wrong please try again")
      });
    }

  }

  onRenewCommentSubmit(renewCommentDescription: HTMLInputElement, bookId, userId) {
    this.renewSubmitted = true;
    this.spinner.show();
    let sendNotification = {
      To: "support@binaryrepublik.com",
      CC: "support@binaryrepublik.com",
      message: "User has requested for renew the book please do the needfull",
      CreatedDate: Date.now()
    }
    // stop here if form is invalid
    if (this.renewForm.invalid) {
      this.spinner.hide();
      return;
    }
    else {
      let result;
      let addCommentStatusCode = 0;
      this.spinner.show();
      this.bookAddingService.changeBookStatus("RenewRequest", userId, bookId).toPromise().then(res => {
        result = res.json();
        console.log(result);
        if (result.StatusCode == "200") {
          addCommentStatusCode = 200;
          this.showSuccess("Book Renew Request send successfully. You will shortly notify for the same")
          this.getIssuedBookDetails(this.user_Id);
          let sendNotificationResult;
          sendNotificationResult = this.bookdetailsService.sendNotification(sendNotification).toPromise().then(res => {
            sendNotificationResult = res.json();
            if (sendNotificationResult.status_code == "200") {
              // this.showSuccess("Mail has been sent successfully")
            }
            else {
              this.showError("Something went wrong In notification")
            }
          }).catch(err => {
            console.error(err)
            // this.showError("Something went wrong please try again")
          });
        }
        else {
          this.showError("Something went wrong In book renew")
          this.spinner.hide();
        }
      }).catch(err => {
        console.error(err)
        this.showError("Something went wrong please try again")
        this.spinner.hide();
      });
    }
  }

  getIssuedBookDetails(user_Id) {
    let result;
    this.isShowNoData = false;
    this.spinner.show()
    result = this.bookdetailsService.getIssuedBookDetails(user_Id).toPromise().then(res => {
      result = res.json();
      if (result != null) {
        this.bookDetails = result.getallissuelistdata;
        this.bookDetails = this.bookDetails.filter(item =>{
          if(item.book_id != null) return item;
        })
        console.log(this.bookDetails);
        //hides spinner after details load
      }
      this.isShowNoData = true;
      this.spinner.hide();
    }).catch(err => {
      console.error(err);
      this.isShowNoData = true;
      this.spinner.hide();
    })

  }

  showSuccess(msg) {
    this.toastr.success(msg, 'Success!');
  }
  showError(msg) {
    this.toastr.error(msg, 'Error!');
  }
  ResetControlValue():void{
    this.rates=0;
    this.commentForm.reset();
    console.log("ResetControlValue");
  }
}
