import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeTaskPageComponent } from './challenge-task-page.component';

describe('ChallengeTaskPageComponent', () => {
  let component: ChallengeTaskPageComponent;
  let fixture: ComponentFixture<ChallengeTaskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeTaskPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
