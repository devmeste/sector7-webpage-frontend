import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmdVsIntelComponent } from './amd-vs-intel.component';
describe('AmdVsIntelComponent', () => {
  let component: AmdVsIntelComponent;
  let fixture: ComponentFixture<AmdVsIntelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmdVsIntelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmdVsIntelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
