import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhotoModalComponent } from './change-photo-modal.component';

describe('ChangePhotoModalComponent', () => {
  let component: ChangePhotoModalComponent;
  let fixture: ComponentFixture<ChangePhotoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePhotoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
