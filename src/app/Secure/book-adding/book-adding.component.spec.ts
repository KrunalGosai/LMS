import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddingComponent } from './book-adding.component';

describe('BookAddingComponent', () => {
  let component: BookAddingComponent;
  let fixture: ComponentFixture<BookAddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
