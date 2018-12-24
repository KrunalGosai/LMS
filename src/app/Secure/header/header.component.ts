import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";
import { BookDetailsService } from '../../../services/book-details.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentMenu: string;
  href: string;
  constructor(private router: Router, private route: ActivatedRoute, private bookdetailsService: BookDetailsService) {

  }

  ngOnInit() {
    this.href = this.router.url;
    console.log("url is", this.router.url);
    if (this.href.includes('book-return')) {
      this.currentMenu = 'myactivity'
    }
    if (this.href == '/') {
      this.currentMenu = 'dashbord'
    }
    if (this.href.includes('admin')) {
      this.currentMenu = 'admin'
    }

  }
  get getuserName() {
    return localStorage['currentUser'];
  }
  get isAdmin() {
    return localStorage['isAdmin'] === "true";
  }
}
