import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsOfThePathsComponent } from './steps-of-the-paths.component';

describe('StepsOfThePathsComponent', () => {
  let component: StepsOfThePathsComponent;
  let fixture: ComponentFixture<StepsOfThePathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsOfThePathsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepsOfThePathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
