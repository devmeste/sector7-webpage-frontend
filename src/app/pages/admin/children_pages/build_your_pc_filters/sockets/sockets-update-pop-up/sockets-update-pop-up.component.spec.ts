import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocketsUpdatePopUpComponent } from './sockets-update-pop-up.component';


describe('SocketsUpdatePopUpComponent', () => {
  let component: SocketsUpdatePopUpComponent;
  let fixture: ComponentFixture<SocketsUpdatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocketsUpdatePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocketsUpdatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
