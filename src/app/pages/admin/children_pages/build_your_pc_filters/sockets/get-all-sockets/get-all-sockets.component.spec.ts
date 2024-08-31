import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetAllSocketsComponent } from './get-all-sockets.component';


describe('GetAllSocketsComponent', () => {
  let component: GetAllSocketsComponent;
  let fixture: ComponentFixture<GetAllSocketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllSocketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllSocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
