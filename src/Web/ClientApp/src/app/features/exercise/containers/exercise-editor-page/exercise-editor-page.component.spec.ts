import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseEditorPageComponent } from './exercise-editor-page.component';

describe('ExerciseEditorPageComponent', () => {
  let component: ExerciseEditorPageComponent;
  let fixture: ComponentFixture<ExerciseEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseEditorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
