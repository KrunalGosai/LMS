import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  display(value: boolean) {
      this.status.next(value);
  }

  show(){
    this.status.next(true);
  }

  hide(){
    this.status.next(false);
  }
}
