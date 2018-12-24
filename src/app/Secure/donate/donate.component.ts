import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { BookDetailsService } from '../../../services/book-details.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
  donateForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private spinner:LoaderService,private toastr:ToastrService,private bookdetailsService: BookDetailsService) { }

  ngOnInit() {
    this.spinner.show();
    this.donateForm = this.formBuilder.group({
      bookTitle: ['', Validators.required],
      message: ['', Validators.required]
    });
    console.log(this.donateForm)
    this.spinner.hide();
  }
  get f() { return this.donateForm.controls; }

  get getuserName(){
    return localStorage['currentUser'];
  }

  onDonateSubmit(bookTitle:HTMLInputElement,message:HTMLInputElement){
    this.spinner.show();
    this.submitted = true;
    if(this.donateForm.controls['bookTitle'].value != null && this.donateForm.controls['message'].value && this.donateForm.controls['bookTitle'].value.trim() != '' && this.donateForm.controls['message'].value.trim() != ''){
    let sendNotificationResult;
    let sendNotification = {
        To: "support@binaryrepublik.com",
        CC: "hardik.gondalia@binaryrepublik.com",
        message: "<div>Hello, " + this.getuserName + " wants to donate a book </div><br><div> Book Title: " + bookTitle.value + " </div><br><div> Book Description: " + message.value,
        CreatedDate: Date.now()
      }
      console.log(sendNotification);
      sendNotificationResult = this.bookdetailsService.sendNotification(sendNotification).toPromise().then(res => {
        sendNotificationResult = res.json();
        if(sendNotificationResult.status_code  == "200"){
          bookTitle.value = "";
          message.value = "";
          this.showSuccess("Admin has been notified")
          this.donateForm.reset();
          this.submitted = false;
          this.spinner.hide();
        }
        else{
          this.showError("Something went wrong please try again")
          this.spinner.hide();
        }
      }).catch(err => {console.error(err)
        this.showError("Something went wrong please try again")
        this.spinner.hide();
      });
    }else{
      this.spinner.hide();
    }
  }

  showSuccess(msg){
    this.toastr.success(msg, 'Success!');
  }

  showError(msg){
    this.toastr.error(msg, 'Error!');
  }
}
