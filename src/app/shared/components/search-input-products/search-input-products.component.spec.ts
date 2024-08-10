import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputProductsComponent } from './search-input-products.component';

describe('SearchInputComponent', () => {
  let component: SearchInputProductsComponent;
  let fixture: ComponentFixture<SearchInputProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchInputProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
