import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsUpdatePopUpComponent } from './products-update-pop-up.component';

describe('ProductsUpdatePopUpComponent', () => {
  let component: ProductsUpdatePopUpComponent;
  let fixture: ComponentFixture<ProductsUpdatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsUpdatePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsUpdatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
