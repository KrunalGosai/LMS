import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsingQueriesComponent } from './search-using-queries.component';

describe('SearchUsingQueriesComponent', () => {
  let component: SearchUsingQueriesComponent;
  let fixture: ComponentFixture<SearchUsingQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUsingQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUsingQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
