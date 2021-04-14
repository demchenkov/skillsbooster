import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDuelModalComponent } from './create-duel-modal.component';

describe('CreateDuelModalComponent', () => {
  let component: CreateDuelModalComponent;
  let fixture: ComponentFixture<CreateDuelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDuelModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDuelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
