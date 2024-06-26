import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WideProductCardComponent } from './wide-product-card.component';

describe('WideProductCardComponent', () => {
  let component: WideProductCardComponent;
  let fixture: ComponentFixture<WideProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WideProductCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WideProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
