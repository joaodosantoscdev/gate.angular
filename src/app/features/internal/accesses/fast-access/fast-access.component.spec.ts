import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastAccessComponent } from './fast-access.component';

describe('FastAccessComponent', () => {
  let component: FastAccessComponent;
  let fixture: ComponentFixture<FastAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
