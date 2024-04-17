import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildYourPcComponent } from './build-your-pc.component';

describe('BuildYourPcComponent', () => {
  let component: BuildYourPcComponent;
  let fixture: ComponentFixture<BuildYourPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildYourPcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildYourPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
