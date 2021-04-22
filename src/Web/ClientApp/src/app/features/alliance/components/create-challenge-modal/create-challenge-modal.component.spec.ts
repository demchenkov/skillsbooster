import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChallengeModalComponent } from './create-challenge-modal.component';

describe('CreateChallengeModalComponent', () => {
  let component: CreateChallengeModalComponent;
  let fixture: ComponentFixture<CreateChallengeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChallengeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChallengeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
