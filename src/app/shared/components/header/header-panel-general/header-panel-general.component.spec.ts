import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPanelGeneralComponent } from './header-panel-general.component';

describe('HeaderPanelGeneralComponent', () => {
  let component: HeaderPanelGeneralComponent;
  let fixture: ComponentFixture<HeaderPanelGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPanelGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderPanelGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
