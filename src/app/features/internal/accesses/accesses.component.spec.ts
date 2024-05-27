import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessesComponent } from './accesses.component';

describe('AccessesComponent', () => {
  let component: AccessesComponent;
  let fixture: ComponentFixture<AccessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
