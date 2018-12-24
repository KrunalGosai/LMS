import { Component, OnInit, HostListener } from '@angular/core';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private scrollAtBottom:boolean = false;
  constructor(private commonSvc: CommonService) { }

  ngOnInit() {
    this.commonSvc.scrollAtBottom.subscribe(value => {
      this.scrollAtBottom = value;
    })
  }
  
  gotop() {
    window.scrollTo(0,0);
    this.commonSvc.scrollAtBottom.next(false)
  }

}
