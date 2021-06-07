import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelTaskSubmissionListComponent } from './duel-task-submission-list.component';

describe('DuelTaskSubmissionListComponent', () => {
  let component: DuelTaskSubmissionListComponent;
  let fixture: ComponentFixture<DuelTaskSubmissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuelTaskSubmissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelTaskSubmissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
