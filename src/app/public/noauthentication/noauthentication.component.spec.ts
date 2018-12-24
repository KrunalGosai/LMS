import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoauthenticationComponent } from './noauthentication.component';

describe('NoauthenticationComponent', () => {
  let component: NoauthenticationComponent;
  let fixture: ComponentFixture<NoauthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoauthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoauthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
