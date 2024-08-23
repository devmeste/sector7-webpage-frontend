import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerS7SmallComponent } from './spinner-s7-small.component';

describe('SpinnerS7SmallComponent', () => {
  let component: SpinnerS7SmallComponent;
  let fixture: ComponentFixture<SpinnerS7SmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerS7SmallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinnerS7SmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
