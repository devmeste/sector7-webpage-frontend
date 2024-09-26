import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnErrorHasOcurredComponent } from './an-error-has-ocurred.component';

describe('AnErrorHasOcurredComponent', () => {
  let component: AnErrorHasOcurredComponent;
  let fixture: ComponentFixture<AnErrorHasOcurredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnErrorHasOcurredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnErrorHasOcurredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
