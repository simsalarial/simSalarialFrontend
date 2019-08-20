import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagComponent } from './account-manag.component';

describe('AccountManagComponent', () => {
  let component: AccountManagComponent;
  let fixture: ComponentFixture<AccountManagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountManagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
