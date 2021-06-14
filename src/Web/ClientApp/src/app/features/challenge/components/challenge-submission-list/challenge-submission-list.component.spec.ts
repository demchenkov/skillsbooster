import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeSubmissionListComponent } from './challenge-submission-list.component';

describe('ChallengeSubmissionListComponent', () => {
  let component: ChallengeSubmissionListComponent;
  let fixture: ComponentFixture<ChallengeSubmissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeSubmissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeSubmissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
