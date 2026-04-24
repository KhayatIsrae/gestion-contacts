import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeContacts } from './liste-contacts';

describe('ListeContacts', () => {
  let component: ListeContacts;
  let fixture: ComponentFixture<ListeContacts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeContacts],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeContacts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
