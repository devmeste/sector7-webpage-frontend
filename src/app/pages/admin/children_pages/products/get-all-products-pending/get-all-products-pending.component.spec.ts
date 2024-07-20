import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllProductsPendingComponent } from './get-all-products-pending.component';

describe('GetAllProductsPendingComponent', () => {
  let component: GetAllProductsPendingComponent;
  let fixture: ComponentFixture<GetAllProductsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllProductsPendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllProductsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
