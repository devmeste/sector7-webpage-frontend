import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BkCarouselComponent } from './bk-carousel.component';

describe('BkCarouselComponent', () => {
  let component: BkCarouselComponent;
  let fixture: ComponentFixture<BkCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BkCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BkCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
