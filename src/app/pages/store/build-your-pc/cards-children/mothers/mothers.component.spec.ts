import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MothersComponent } from './mothers.component';

describe('MothersComponent', () => {
  let component: MothersComponent;
  let fixture: ComponentFixture<MothersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MothersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MothersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
