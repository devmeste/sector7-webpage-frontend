import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSocketComponent } from './create-socket.component';

describe('CreateSocketComponent', () => {
  let component: CreateSocketComponent;
  let fixture: ComponentFixture<CreateSocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSocketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
