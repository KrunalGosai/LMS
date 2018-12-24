import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookAddingService } from 'src/services/book-adding.service';
import { LoaderService } from 'src/app/loader/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() bookList: any;
  @Output() onBookFilter = new EventEmitter();
  @Output() showHistoryDialogBox = new EventEmitter();
  @Output() notifyPopup = new EventEmitter();
  @Output() deleteBookById = new EventEmitter();
  requestedByForm: FormGroup;
  returnedForm: FormGroup;
  renewedByForm: FormGroup;
  requestedResponse: string = "Approved";
  returnedResponse: string = "Done";

  constructor(private formBuilder: FormBuilder,
    private booklistingservice: BookAddingService, private toastr: ToastrService,
    private spinner: LoaderService) { }

  ngOnInit() {
    this.requestedByForm = this.formBuilder.group({
      requestedRadioButton: ['', Validators.required]
    });
    this.returnedForm = this.formBuilder.group({
      returnedRadioButton: ['', Validators.required]
    });
    this.renewedByForm = this.formBuilder.group({
      renewedRadioButton: ['', Validators.required]
    });
  }

  onRequestedResultSubmit(requestResult, requestedBy, bookid) {
    this.spinner.show();
    console.log(requestResult);
    console.log(requestedBy);
    console.log(bookid);
    this.booklistingservice.changeBookStatus(requestResult, requestedBy, bookid).toPromise().then(res => {
      this.spinner.hide();
      // this.getBookListingData();
      this.showSuccess("Book Successfully saved!")
      this.onBookFilter.emit();
      this.requestedResponse = "Approved";
    }).catch(err => { console.error(err); this.spinner.hide(); this.showError("Please try again something went wrong"); });

  }

  onRenewedResultSubmit(requestResult, requestedBy, bookid) {
    this.spinner.show();
    if (requestResult == 'Approved') {
      requestResult = 'Renew Accepted'
    }
    else {
      requestResult = 'Renew Rejected'
    }
    this.booklistingservice.changeBookStatus(requestResult, requestedBy, bookid).toPromise().then(res => {
      this.spinner.hide();
      // this.getBookListingData();
      this.showSuccess("Book Successfully saved!")
      this.onBookFilter.emit();
      this.requestedResponse = "Approved";
    }).catch(err => { console.error(err); this.spinner.hide(); this.showError("Please try again something went wrong"); });
  }

  onReturnedResultSubmit(requestResult, requestedBy, bookid) {
    this.spinner.show();
    this.booklistingservice.changeBookStatus(requestResult, requestedBy, bookid).toPromise().then(res => {
      // this.getBookListingData();
      this.spinner.hide();
      this.onBookFilter.emit();
      this.showSuccess("Return Completed Successfully.");
    }).catch(err => { console.error(err); this.spinner.hide(); this.showError("Please try again something went wrong"); });

  }

  showHistoryDialog(id) {
    this.showHistoryDialogBox.emit(id);
  }

  togglePopup(requestedBy) {
    this.notifyPopup.emit(requestedBy);
  }

  deleteBook(id) {
    this.deleteBookById.emit(id);
  }

  showSuccess(msg) {
    this.toastr.success(msg, 'Success!');
  }

  showError(msg) {
    this.toastr.error(msg, 'Error!');
  }

  imageError(event) {
    event.target.src = './../../../assets/Images/default_book_cover.jpg';
  }

}
