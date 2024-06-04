import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessSymbolComponent } from './access-symbol.component';

describe('AccessSymbolComponent', () => {
  let component: AccessSymbolComponent;
  let fixture: ComponentFixture<AccessSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessSymbolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
