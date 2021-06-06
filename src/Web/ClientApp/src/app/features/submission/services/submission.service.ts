import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { Submission } from 'src/app/domain/entities';
import { SubmissionsApiService } from './submission-api.service';

@Injectable()
export class SubmissionsService {

  constructor(private apiService: SubmissionsApiService) {}

  getMySubmissions(exerciseId: number) {
    return this.apiService.getMySubmissions(exerciseId);
  }

  getSubmissionById(id: number) {
    return this.apiService.getSubmissionById(id);
  }

  submitExercise(submission: Partial<Submission>) {
    const result = this.apiService.submitTask(submission).pipe(share());
    result.subscribe();
    return result;
  }
}
