import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllianceListComponent } from './alliance-list.component';

describe('AllianceListComponent', () => {
  let component: AllianceListComponent;
  let fixture: ComponentFixture<AllianceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllianceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllianceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
