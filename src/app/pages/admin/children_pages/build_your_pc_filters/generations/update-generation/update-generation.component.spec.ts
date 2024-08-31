import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGenerationComponent } from './update-generation.component';

describe('UpdateGenerationComponent', () => {
  let component: UpdateGenerationComponent;
  let fixture: ComponentFixture<UpdateGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGenerationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
