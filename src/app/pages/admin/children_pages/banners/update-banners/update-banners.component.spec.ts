import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBannersComponent } from './update-banners.component';

describe('UpdateBannersComponent', () => {
  let component: UpdateBannersComponent;
  let fixture: ComponentFixture<UpdateBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBannersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
