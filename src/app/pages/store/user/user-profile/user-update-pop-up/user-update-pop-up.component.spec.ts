import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdatePopUpComponent } from './user-update-pop-up.component';

describe('UserUpdatePopUpComponent', () => {
  let component: UserUpdatePopUpComponent;
  let fixture: ComponentFixture<UserUpdatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUpdatePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserUpdatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
