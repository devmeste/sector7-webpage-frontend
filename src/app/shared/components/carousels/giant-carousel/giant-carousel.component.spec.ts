import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiantCarouselComponent } from './giant-carousel.component';

describe('GiantCarouselComponent', () => {
  let component: GiantCarouselComponent;
  let fixture: ComponentFixture<GiantCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiantCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiantCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
