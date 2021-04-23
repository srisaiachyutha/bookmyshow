import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatbookingComponent } from './seatbooking.component';

describe('SeatbookingComponent', () => {
  let component: SeatbookingComponent;
  let fixture: ComponentFixture<SeatbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
