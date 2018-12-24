import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BookListing } from '../../../model/book-listing';
import { BookAddingService } from '../../../services/book-adding.service';
import { BookDetailsService } from '../../../services/book-details.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.scss']
})
export class BookListingComponent implements OnInit {

  constructor(
    private booklistingservice: BookAddingService, private spinner: LoaderService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router, private bookdetailsService: BookDetailsService) {
    this.InitValidation();
    this.styleTag = this.buildStyleElement();
  }
  mailRequestedBy: string;
  bookListing: BookListing[];
  public currentBookDetails: any = [];
  public bookEdit: any;
  mailForm: FormGroup;
  public isShowNoData: boolean = true;
  isMailPopupShow: boolean = false;
  private mailPatter = /^(\s?[^\s;]+@[^\s;]+\.[^\s;]+\s?;)*(\s?[^\s;]+@[^\s;]+\.[^\s;]+)$/; ///^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  public bookStatus: any = [];
  public filterBookStatus: string = "0";
  public bookSearchByName: string = "";
  showModel: boolean = false;
  bookHisoryData: any[] = [];
  book_Id: number;
  submitted = false;
  private styleTag: HTMLStyleElement;

  ngOnInit() {
    this.isShowNoData = false;
    //shows spinner on initiallization
    this.getBookListingData();
  }

  getBookListingData() {
    this.spinner.show();
    let result;
   // this.booklistingservice.getBookDetailForAdmin('', '', '').toPromise().then(res => {
    this.booklistingservice.getBookDeatailonFilter('0', '').toPromise().then(res => {
      result = res.json();
      console.log(result);
      if (result.bookbyid != undefined) {
        this.currentBookDetails = result.bookbyid;
        this.currentBookDetails = this.currentBookDetails.filter(x => x.is_visible == true);
      }
      console.log("currentBookDetails");
      console.log(this.currentBookDetails);
      this.isShowNoData = true;
      this.spinner.hide();
      //for testing that whether spinner works or not
      //setTimeout(() => { this.spinner.hide(); }, 4000);
    }).catch(err => {
      console.log(err);
      this.isShowNoData = true;
      this.spinner.hide();
    });
    this.booklistingservice.getBookStatus().toPromise().then(res => {
      result = res.json();
      this.bookStatus = result.bookStatus;

      this.bookStatus = this.bookStatus.filter(b => b.Book_status != "Deleted" && b.Book_status != "Request Rejected"  && b.Book_status != "Renew Approved");
    });
  }

  InitValidation() {
    this.mailForm = this.formBuilder.group({
      txtTo: ['', [Validators.required, this.ValidateEmailId]],
      txtCc: ['', this.ValidateEmailId],
      txtMessage: ['', Validators.required],
    });
  }

  deleteBook(ID) {
    //its deleteing from client side quickly and then calling server for delete book.
    if (confirm('Deleted book can not be recover, Are you sure?') == true) {
      //console.log("Delete Id" + ID);
      this.spinner.show();
      this.isShowNoData = false;
      this.currentBookDetails = this.currentBookDetails.filter(item => { if (item.ID != ID) return item; });
      this.showSuccess("Record Deleted Successfully");
      this.isShowNoData = true;
      this.spinner.hide();
      this.booklistingservice.deleteBook(ID).toPromise().then(res => {
        if (res.json().status_code != 400) {
          // this.showSuccess("Record Deleted");
          // let result;
          // this.booklistingservice.getBookDetailForAdmin('', '', '').toPromise().then(res => {
          //     result = res.json();
          //     this.currentBookDetails = result.bookbyid;
          //     this.currentBookDetails = this.currentBookDetails.filter(x => x.is_visible == true);
          //     console.log(result);
          //     // this.spinner.hide();
          //     this.isShowNoData = true;
          //   }).catch(err => {console.log(err); this.isShowNoData = true; this.spinner.hide();});
        } else {
          // this.isShowNoData = true;
          // this.spinner.hide();
          this.showError("Something went wrong");
        }
      }, err => {
        console.log(err)
        // this.isShowNoData = true;
        // this.spinner.hide();
        this.showError("Something went wrong");
      });
    }
  }

  sendMail(data, toEmailAddress) {
    //return false;
    this.spinner.show();
    this.booklistingservice.sendMail(data.value.txtTo, data.value.txtCc, data.value.txtMessage).toPromise().then(res => {
      this.spinner.hide();
    }).catch(err => {
      console.log(err);
      this.spinner.hide();
    });
    this.showSuccess('Notification sent successfully !!')
    this.togglePopup(toEmailAddress);
  }

  togglePopup(toEmailAddress) {
    this.mailRequestedBy = toEmailAddress;
    this.isMailPopupShow = !this.isMailPopupShow;
    if( this.isMailPopupShow){
      this.disable();
    }
    else{
      this.enable();
    }
    // setting the values in the field to auto populate the values
    this.mailForm.controls.txtMessage.setValue("Hello, </br></br> This is the reminder that the book issued by you has reached the due date to return the book.</br></br> Thanks");
    this.mailForm.controls.txtCc.setValue("support@binaryrepublik.com");
    this.mailForm.controls.txtTo.setValue(toEmailAddress + "@binaryrepublik.com");
    if (!this.isMailPopupShow) {
      this.mailForm.reset();
    }
  }

  showSuccess(msg) {
    this.toastr.success(msg, 'Success!');
  }
  showError(msg) {
    this.toastr.error(msg, 'Error!');
  }

  OnBookFilter() {
    this.spinner.show();
    let result;
    this.booklistingservice.getBookDeatailonFilter(this.filterBookStatus, this.bookSearchByName).toPromise().then(res => {
      result = res.json();
      if (result.bookbyid != undefined) {
        this.currentBookDetails = result.bookbyid;
        console.log(this.currentBookDetails);
        this.currentBookDetails = this.currentBookDetails.filter(x => x.is_visible == true);
      }
      else {
        this.currentBookDetails = []
      }
      this.isShowNoData = true;
      this.spinner.hide();
      //for testing that whether spinner works or not
      //setTimeout(() => { this.spinner.hide(); }, 4000);
    }).catch(err => {
      console.log(err);
      this.isShowNoData = true;
      this.spinner.hide();
    });

  }

  isNeedAnchorTagDisabled(): boolean {
    console.log("search", this.bookSearchByName.length);
    return this.bookSearchByName.length == 0 ? false : true;
  }

  navigateToAdminDashBoard() {
    this.router.navigateByUrl('/admin-dash');
  }

  //Closes the history popup box
  closeHistoryDialog() {
    this.showModel = false;
    this.enable();
  }

  // Closes the email sending mail box
  closeMailBox() {
    this.isMailPopupShow = false;
    this.enable();
  }

  //this function is called on click of view history link of book-listing page
  showHistoryDialog(Id) {
    this.spinner.show();
    this.bookdetailsService.getBookHistory(Id).then(res => {
      this.showModel = true;
      //console.log("res: ", res.json());
      if (res.json().getallissuelistdata && res.json().getallissuelistdata.length > 0) {
        this.bookHisoryData = res.json().getallissuelistdata;
        this.disable();
      }
      else {
        this.bookHisoryData = [];
        this.disable();
      }
      this.spinner.hide();
    }).catch(err => {
      this.showError("Please try again something went wrong");
      this.enable();
      this.spinner.hide()
    })
  }

  ValidateEmailId(control: AbstractControl): { [key: string]: boolean } {
    if (control.value.length == 0) {
      return null;
    }
    var EmailIds = control.value.split(';');
    if(EmailIds.filter(i => i == "").length >= 2) return { 'validEmailId': true };
    
    for (var i = 0; i < EmailIds.length; i++) {
      if (EmailIds[i].trim() == "") {
      }
      else if (EmailIds[i].trim().match(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/) == null) {
        return { 'validEmailId': true };
      }
      else if (EmailIds[i].trim().indexOf('.') == -1 || EmailIds[i].indexOf('.') == EmailIds[i].length - 1) {
        return { 'validEmailId': true };
      }

    }
    return null;
  }
  private buildStyleElement(): HTMLStyleElement {

    var style = document.createElement("style");

    style.type = "text/css";
    style.setAttribute("data-debug", "Injected by WindowScrolling service.");
    style.textContent = `
        body {
            overflow: hidden !important ;
        }
    `;

    return (style);
  }
  public disable(): void {
    document.body.appendChild(this.styleTag);
  }
  public enable(): void {
    document.body.removeChild(this.styleTag);
  }
}