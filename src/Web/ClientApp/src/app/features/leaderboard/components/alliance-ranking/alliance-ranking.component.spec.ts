import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllianceRankingComponent } from './alliance-ranking.component';

describe('AllianceRankingComponent', () => {
  let component: AllianceRankingComponent;
  let fixture: ComponentFixture<AllianceRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllianceRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllianceRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
