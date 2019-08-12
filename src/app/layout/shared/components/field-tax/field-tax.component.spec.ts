import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTaxComponent } from './field-tax.component';

describe('FieldTaxComponent', () => {
  let component: FieldTaxComponent;
  let fixture: ComponentFixture<FieldTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
