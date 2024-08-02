import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildYourPcVsComponent } from './build-your-pc-vs.component';

describe('BuildYourPcVsComponent', () => {
  let component: BuildYourPcVsComponent;
  let fixture: ComponentFixture<BuildYourPcVsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildYourPcVsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildYourPcVsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
