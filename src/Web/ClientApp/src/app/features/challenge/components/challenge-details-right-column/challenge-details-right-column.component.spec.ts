import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDetailsRightColumnComponent } from './challenge-details-right-column.component';

describe('DetailsRightColumnComponent', () => {
  let component: ChallengeDetailsRightColumnComponent;
  let fixture: ComponentFixture<ChallengeDetailsRightColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeDetailsRightColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDetailsRightColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
