import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemoryTypeComponent } from './update-memory-type.component';

describe('UpdateMemoryTypeComponent', () => {
  let component: UpdateMemoryTypeComponent;
  let fixture: ComponentFixture<UpdateMemoryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMemoryTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMemoryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
