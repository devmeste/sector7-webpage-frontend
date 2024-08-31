import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllMemoryTypesComponent } from './get-all-memory-types.component';

describe('GetAllMemoryTypesComponent', () => {
  let component: GetAllMemoryTypesComponent;
  let fixture: ComponentFixture<GetAllMemoryTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllMemoryTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllMemoryTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
