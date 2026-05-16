import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsContacts } from './stats-contacts';

describe('StatsContacts', () => {
  let component: StatsContacts;
  let fixture: ComponentFixture<StatsContacts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsContacts],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsContacts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
