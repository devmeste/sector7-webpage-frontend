import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllGenerationsComponent } from './get-all-generations.component';

describe('GetAllGenerationsComponent', () => {
  let component: GetAllGenerationsComponent;
  let fixture: ComponentFixture<GetAllGenerationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllGenerationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllGenerationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
