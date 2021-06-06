import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionDetailsComponent } from './submission-details-page.component';

describe('SubmissionDetailsComponent', () => {
  let component: SubmissionDetailsComponent;
  let fixture: ComponentFixture<SubmissionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
