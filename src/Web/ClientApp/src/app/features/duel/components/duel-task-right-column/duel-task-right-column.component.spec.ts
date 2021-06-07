import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelTaskRightColumnComponent } from './duel-task-right-column.component';

describe('DuelTaskRightColumnComponent', () => {
  let component: DuelTaskRightColumnComponent;
  let fixture: ComponentFixture<DuelTaskRightColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuelTaskRightColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelTaskRightColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
