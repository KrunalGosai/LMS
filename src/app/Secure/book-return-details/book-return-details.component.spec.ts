import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReturnDetailsComponent } from './book-return-details.component';

describe('BookReturnDetailsComponent', () => {
  let component: BookReturnDetailsComponent;
  let fixture: ComponentFixture<BookReturnDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookReturnDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReturnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
