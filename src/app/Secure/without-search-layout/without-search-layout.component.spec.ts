import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutSearchLayoutComponent } from './without-search-layout.component';

describe('WithoutSearchLayoutComponent', () => {
  let component: WithoutSearchLayoutComponent;
  let fixture: ComponentFixture<WithoutSearchLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithoutSearchLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutSearchLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
