import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPsocialComponent } from './card-psocial.component';

describe('CardPsocialComponent', () => {
  let component: CardPsocialComponent;
  let fixture: ComponentFixture<CardPsocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPsocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
