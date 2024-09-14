import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllBannersComponent } from './get-all-banners.component';

describe('GetAllBannersComponent', () => {
  let component: GetAllBannersComponent;
  let fixture: ComponentFixture<GetAllBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllBannersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
