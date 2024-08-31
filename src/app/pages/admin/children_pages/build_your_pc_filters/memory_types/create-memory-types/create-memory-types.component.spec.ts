import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemoryTypesComponent } from './create-memory-types.component';

describe('CreateMemoryTypesComponent', () => {
  let component: CreateMemoryTypesComponent;
  let fixture: ComponentFixture<CreateMemoryTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMemoryTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMemoryTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
