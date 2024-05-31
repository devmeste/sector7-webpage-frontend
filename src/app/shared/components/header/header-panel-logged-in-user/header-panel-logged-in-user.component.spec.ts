import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPanelLoggedInUserComponent } from './header-panel-logged-in-user.component';

describe('HeaderPanelLoggedInUserComponent', () => {
  let component: HeaderPanelLoggedInUserComponent;
  let fixture: ComponentFixture<HeaderPanelLoggedInUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPanelLoggedInUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderPanelLoggedInUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
