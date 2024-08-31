import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGenerationsComponent } from './create-generations.component';

describe('CreateGenerationsComponent', () => {
  let component: CreateGenerationsComponent;
  let fixture: ComponentFixture<CreateGenerationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGenerationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGenerationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
