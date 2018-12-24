import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class CommonService {
    public searchtxt = new Subject<any>();
    public currentCategory = new Subject<any>();
    public scrollAtBottom = new Subject<boolean>()

    constructor(){
        this.currentCategory.next({ text: "All" });
        this.scrollAtBottom.next(false);
    }
    
    clearSearchtxt() {
        this.searchtxt.next();
        this.currentCategory.next({ text: "All" });
    }
    getMessage(): Observable<any> {
        return this.searchtxt.asObservable();
    }
}