import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceDeliveryMethodComponent } from './choice-delivery-method.component';

describe('ChoiceDeliveryMethodComponent', () => {
  let component: ChoiceDeliveryMethodComponent;
  let fixture: ComponentFixture<ChoiceDeliveryMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceDeliveryMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoiceDeliveryMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
