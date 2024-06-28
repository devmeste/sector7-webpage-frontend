import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesUpdatePopUpComponent } from './categories-update-pop-up.component';

describe('CategoriesUpdatePopUpComponent', () => {
  let component: CategoriesUpdatePopUpComponent;
  let fixture: ComponentFixture<CategoriesUpdatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesUpdatePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesUpdatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
