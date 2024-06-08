import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDangerTextComponent } from './input-danger-text.component';

describe('InputDangerTextComponent', () => {
  let component: InputDangerTextComponent;
  let fixture: ComponentFixture<InputDangerTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDangerTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDangerTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
