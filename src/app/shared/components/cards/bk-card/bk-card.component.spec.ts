import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BkCardComponent } from './bk-card.component';

describe('BkCardComponent', () => {
  let component: BkCardComponent;
  let fixture: ComponentFixture<BkCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BkCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
