import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimManagComponent } from './sim-manag.component';

describe('SimManagComponent', () => {
  let component: SimManagComponent;
  let fixture: ComponentFixture<SimManagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimManagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimManagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
