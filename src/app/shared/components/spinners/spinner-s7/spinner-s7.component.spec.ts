import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerS7Component } from './spinner-s7.component';

describe('SpinnerS7Component', () => {
  let component: SpinnerS7Component;
  let fixture: ComponentFixture<SpinnerS7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerS7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinnerS7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
