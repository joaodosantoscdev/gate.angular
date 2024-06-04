import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamsComponent } from './users.component';

describe('CamsComponent', () => {
  let component: CamsComponent;
  let fixture: ComponentFixture<CamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
