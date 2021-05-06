import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalRankingComponent } from './personal-ranking.component';

describe('PersonalRankingComponent', () => {
  let component: PersonalRankingComponent;
  let fixture: ComponentFixture<PersonalRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
