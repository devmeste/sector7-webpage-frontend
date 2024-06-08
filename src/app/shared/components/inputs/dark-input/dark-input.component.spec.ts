import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkInputComponent } from './dark-input.component';

describe('DarkInputComponent', () => {
  let component: DarkInputComponent;
  let fixture: ComponentFixture<DarkInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DarkInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
