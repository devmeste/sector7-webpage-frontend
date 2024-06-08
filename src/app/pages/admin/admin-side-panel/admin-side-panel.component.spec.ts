import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidePanelComponent } from './admin-side-panel.component';

describe('AdminSidePanelComponent', () => {
  let component: AdminSidePanelComponent;
  let fixture: ComponentFixture<AdminSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSidePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
