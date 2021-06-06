import { SubmissionStatus } from "../enums";

export class Submission {
  id: number; // int
  body: string;
  status: SubmissionStatus;
  score: number; // double
  langKey: string;
  submittedAt: Date;
  exerciseId: number; // int
  exerciseTitle: string;
  submitterId: number; // int
  submitterName: string;
  challengeId?: number; // int;
  duelId?: number; // int;

  static fromObject(data: any): Submission {
    const entity = new Submission();

    entity.id = data.id;
    entity.body = data.body;
    entity.status = data.status;
    entity.score = data.score;
    entity.submittedAt = data.submittedAt;
    entity.exerciseId = data.exerciseId;
    entity.exerciseTitle = data.exerciseTitle;
    entity.submitterId = data.submitterId;
    entity.submitterName = data.submitterName;
    entity.challengeId = data.challengeId;
    entity.duelId = data.duelId;

    return entity;
  }
}
