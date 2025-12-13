import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcases } from './showcases';

describe('Showcases', () => {
  let component: Showcases;
  let fixture: ComponentFixture<Showcases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Showcases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Showcases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
