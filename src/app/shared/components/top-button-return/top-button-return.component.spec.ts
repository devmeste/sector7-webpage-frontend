import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopButtonReturnComponent } from './top-button-return.component';

describe('TopButtonReturnComponent', () => {
  let component: TopButtonReturnComponent;
  let fixture: ComponentFixture<TopButtonReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopButtonReturnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopButtonReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
