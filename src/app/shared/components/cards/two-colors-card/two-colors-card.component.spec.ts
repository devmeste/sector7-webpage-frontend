import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoColorsCardComponent } from './two-colors-card.component';

describe('TwoColorsCardComponent', () => {
  let component: TwoColorsCardComponent;
  let fixture: ComponentFixture<TwoColorsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoColorsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwoColorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
