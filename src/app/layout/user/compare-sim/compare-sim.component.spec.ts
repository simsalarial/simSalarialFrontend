import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSimComponent } from './compare-sim.component';

describe('CompareSimComponent', () => {
  let component: CompareSimComponent;
  let fixture: ComponentFixture<CompareSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
