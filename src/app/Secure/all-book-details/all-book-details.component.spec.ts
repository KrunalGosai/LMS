import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookDetailsComponent } from './all-book-details.component';

describe('AllBookDetailsComponent', () => {
  let component: AllBookDetailsComponent;
  let fixture: ComponentFixture<AllBookDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBookDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
