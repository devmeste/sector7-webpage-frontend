import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllUsdComponent } from './get-all-usd.component';

describe('GetAllUsdComponent', () => {
  let component: GetAllUsdComponent;
  let fixture: ComponentFixture<GetAllUsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllUsdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllUsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
