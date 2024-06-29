import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableProductsComponent } from './enable-products.component';

describe('EnableProductsComponent', () => {
  let component: EnableProductsComponent;
  let fixture: ComponentFixture<EnableProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnableProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
