import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillAddressPopUpComponent } from './fill-address-pop-up.component';

describe('FillAddressPopUpComponent', () => {
  let component: FillAddressPopUpComponent;
  let fixture: ComponentFixture<FillAddressPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillAddressPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FillAddressPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
