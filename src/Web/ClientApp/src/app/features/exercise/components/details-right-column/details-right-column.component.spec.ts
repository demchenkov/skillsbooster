import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRightColumnComponent } from './details-right-column.component';

describe('DetailsRightColumnComponent', () => {
  let component: DetailsRightColumnComponent;
  let fixture: ComponentFixture<DetailsRightColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRightColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRightColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
