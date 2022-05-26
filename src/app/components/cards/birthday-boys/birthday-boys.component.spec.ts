import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayBoysComponent } from './birthday-boys.component';

describe('BirthdayBoysComponent', () => {
  let component: BirthdayBoysComponent;
  let fixture: ComponentFixture<BirthdayBoysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdayBoysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayBoysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
