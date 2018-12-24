import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BookDetailsService } from '../../../services/book-details.service';
import { BookAddingService } from '../../../services/book-adding.service';
import { BookListing } from '../../../model/book-listing';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-book-adding',
  templateUrl: './book-adding.component.html',
  styleUrls: ['./book-adding.component.css']
})
export class BookAddingComponent implements OnInit {
  public bookStatus: any;
  public categorylist: any;
  public fileData: string;
  fileURL: string;
  book_Id: number = 0;
  title = 'Add Book';
  addForm: FormGroup;
  public bookEdit: any;
  requestedBy = "";
  private isSave: Boolean = false;
  froalaOptions: any = {
    height: 300
  };

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private formBuilder: FormBuilder, public route: ActivatedRoute,
    private toastr: ToastrService, private spinner: LoaderService, public router: Router,
    private booklistingservice: BookAddingService) {
    this.InitValidation();
    this.route.params.subscribe((params) => {
      this.book_Id = params["id"];
    })
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      var regex = /^([a-zA-Z0-9\s_\\.\-:,])+(.jpg|.jpeg|.png)$/; ///^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/
      let file = event.target.files[0];
      if (file.name.toLowerCase().match(regex)) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.fileData = reader.result.toString().split(',')[1];
          console.log(this.fileData);
          this.addForm.controls['imageInput'].setValue(file ? this.fileData : '');
          this.addImage(file);
        };
      } else {
        this.showError("Invalid File Type!");
      }
    }
  }

  ngOnInit() {
    let result;
    this.spinner.show();
    if (this.router.url === '/admin/book-adding') {
      this.title = 'Add Book'
    } else {
      this.title = 'Update Book'
    }

    this.booklistingservice.getBookCategory().toPromise().then(res => {
      result = res.json();
      this.categorylist = result.categorylist;
      console.log(this.categorylist);
    }).catch(err => console.log(err));

    this.booklistingservice.getBookStatus().toPromise().then(res => {
      result = res.json();
      this.bookStatus = result.bookStatus;

      if (this.book_Id > 0) {
        this.route.params.subscribe(params => {
          this.booklistingservice.getBookDeatailForEdit(this.book_Id).subscribe(res => {
            this.bookEdit = res.json().bookbyid[0];
            this.addForm.get("bookTitle").setValue(this.bookEdit.book_title);
            this.addForm.get("bookDescription").setValue(this.bookEdit.book_description);
            this.addForm.get("bookAuthor").setValue(this.bookEdit.author_name);
            this.addForm.get("bookStatus").setValue(this.bookEdit.book_Status);
            this.addForm.get("bookDonner").setValue(this.bookEdit.Donner)
            this.addForm.get("bookCategory").setValue(this.bookEdit.category_Name);
            this.addForm.get("imageInput").setValue(this.bookEdit.book_cover_image);
            this.addForm.get("quntity").setValue(this.bookEdit.book_quntity);
            this.fileURL = this.bookEdit.book_cover_image;
            this.requestedBy = this.bookEdit.requestedBy;
            // hide the spinner after the data loading completes
            this.spinner.hide();
          });
        });
      } else {
        this.setDefaultValue();
        this.spinner.hide();
      }
    }).catch(err => { console.log(err); this.spinner.hide(); });


  }

  setDefaultValue() {
    let status_id = []
    status_id = this.bookStatus.filter(item => { if (item.Book_status.toString().toLowerCase() == 'available') return item });
    if (status_id && status_id.length > 0) {
      this.addForm.get("bookStatus").setValue(status_id[0].ID);
    }
    this.addForm.get("bookDonner").setValue('N/A');
    this.addForm.get("quntity").setValue('1')
  }

  InitValidation() {
    //console.log(this.current); 
    this.addForm = this.formBuilder.group({
      bookTitle: ['', Validators.required],
      bookDescription: ['', Validators.required],
      imageInput: ['', Validators.required],
      bookAuthor: ['', Validators.required],
      bookDonner: ['', Validators.required],
      bookStatus: ['', Validators.required],
      bookImage: [''],
      bookCategory: ['', Validators.required],
      quntity: ['']
    });
  }

  addBook(data) {
    let result;
    this.isSave = true;
    this.spinner.show();
    this.booklistingservice.addBook(data.value.bookTitle, data.value.bookDescription, data.value.bookAuthor, data.value.bookDonner, data.value.bookStatus, data.value.bookCategory, this.fileURL, data.value.quntity).toPromise().then(res => {
      result = res.json();
      if (result.status_code == 200) {
        this.showSuccess("Record added successfully ");
        this.addForm.reset();
        this.addForm.get("imageInput").setValue('');
        // this.addForm.removeControl('imageInput')  
        this.fileURL = '';
        this.setDefaultValue();
        this.isSave = false;
        this.spinner.hide();
        // this.router.navigate(['admin/book-listing']);
      }
      else {
        this.showError("Something went wrong !!");
        this.spinner.hide();
      }
    }).catch(err => {
      console.error(err);
      this.isSave = false;
      this.spinner.hide();
    })
  }

  addImage(file: File) {
    this.spinner.show();
    this.booklistingservice.addImage(file).subscribe(res => {
      console.log('File', res.json())
      if (res.json().status_code != 400)
        this.fileURL = res.json();
      if (!this.isSave)
        this.spinner.hide();
    });
  }

  updateBook(data) {
    console.log(data);
    let result;
    this.spinner.show();
    console.log(this.requestedBy);
    this.route.params.subscribe(params => {
      this.booklistingservice.updateBook(data.value.bookTitle, data.value.bookDescription, data.value.bookAuthor, data.value.bookDonner, data.value.bookStatus, data.value.bookCategory, data.value.quntity, this.fileURL, params['id'], this.requestedBy).toPromise().then(res => {
        result = res.json();
        if (result.status_code == 200) {
          this.showSuccess("Record updated successfully ");
          this.router.navigate(['admin/book-listing']);
          this.spinner.hide();
        }
        else {
          this.showError("Something went wrong !!");
          this.spinner.hide();
        }
      }).catch(err => { console.error(err); this.spinner.hide(); })
      // setTimeout(() => {
      //   this.spinner.hide();
      // }, 5000);
    });
  }

  showSuccess(msg) {
    this.toastr.success(msg, 'Success!');
  }

  showError(msg) {
    this.toastr.error(msg, 'Error!');
  }
}