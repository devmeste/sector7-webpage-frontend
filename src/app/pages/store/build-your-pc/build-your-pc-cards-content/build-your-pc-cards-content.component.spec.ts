import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildYourPcCardsContentComponent } from './build-your-pc-cards-content.component';

describe('BuildYourPcCardsContentComponent', () => {
  let component: BuildYourPcCardsContentComponent;
  let fixture: ComponentFixture<BuildYourPcCardsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildYourPcCardsContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildYourPcCardsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
