import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { LoaderService } from './loader/loader.service';
import { CommonService } from 'src/services/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  addForm: FormGroup;
  showLoader: boolean;
  constructor(private loaderService: LoaderService, private commonSvc: CommonService){    
  }

  ngOnInit(){
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

  @HostListener('window:scroll', ['$event']) 
  doSomething() {
    var scrollHeight = document.documentElement.scrollHeight;
    var scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
      // when scroll to bottom of the page
      this.commonSvc.scrollAtBottom.next(true);
    }else{
      this.commonSvc.scrollAtBottom.next(false);
    }
  }
}
