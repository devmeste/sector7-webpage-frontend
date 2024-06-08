import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsdComponent } from './create-usd.component';

describe('CreateUsdComponent', () => {
  let component: CreateUsdComponent;
  let fixture: ComponentFixture<CreateUsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUsdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
