import { ChallengeStatus, SubmissionStatus } from "../enums";
import { Alliance } from "./alliance.model";

export class Challenge {
  id: number;
  title: string;
  status: ChallengeStatus;
  startDate: Date;
  finishDate: Date;

  competitors: Array<ChallengeAlliance>;
  exercises: Array<ChallengeExercise>;

  static fromObject(data: any): Challenge {
    const entity = new Challenge();

    entity.id = data.id;
    entity.title = data.title;
    entity.status = data.status;
    entity.startDate = new Date(data.startDate);
    entity.finishDate = new Date(data.finishDate);

    entity.competitors = data.competitors as Array<ChallengeAlliance>;
    entity.exercises = data.exercises as Array<ChallengeExercise>;

    return entity;
  }
}

interface ChallengeExercise {
  id: number;
  title: string;
  status: SubmissionStatus;
  submittedBy: string;
  score: number;
}


interface ChallengeAlliance {
  alliance: Alliance
  exerciseScore: Record<number, number>
  totalScore: number
}
