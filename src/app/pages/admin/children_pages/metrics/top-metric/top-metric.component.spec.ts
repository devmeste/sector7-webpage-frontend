import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMetricComponent } from './top-metric.component';

describe('TopMetricComponent', () => {
  let component: TopMetricComponent;
  let fixture: ComponentFixture<TopMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMetricComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
