import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimDetailComponent } from './sim-detail.component';

describe('SimDetailComponent', () => {
  let component: SimDetailComponent;
  let fixture: ComponentFixture<SimDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
