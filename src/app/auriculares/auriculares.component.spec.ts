import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuricularesComponent } from './auriculares.component';

describe('AuricularesComponent', () => {
  let component: AuricularesComponent;
  let fixture: ComponentFixture<AuricularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuricularesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuricularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
