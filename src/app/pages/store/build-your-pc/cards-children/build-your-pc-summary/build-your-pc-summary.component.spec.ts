import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildYourPcSummaryComponent } from './build-your-pc-summary.component';

describe('BuildYourPcSummaryComponent', () => {
  let component: BuildYourPcSummaryComponent;
  let fixture: ComponentFixture<BuildYourPcSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildYourPcSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildYourPcSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
