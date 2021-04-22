import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeTasksComponent } from './challenge-tasks.component';

describe('ChallengeTasksComponent', () => {
  let component: ChallengeTasksComponent;
  let fixture: ComponentFixture<ChallengeTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
