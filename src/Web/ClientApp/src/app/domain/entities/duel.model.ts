import { DuelStatus, SubmissionStatus } from "../enums";
import { User } from "./user.model";

export class Duel {
  id: number;
  title: string;
  status: DuelStatus;
  startDate: Date;
  finishDate: Date;

  competitors: Array<DuelUser>;
  exercises: Array<DuelExercise>;

  static fromObject(data: any): Duel {
    const entity = new Duel();

    entity.id = data.id;
    entity.title = data.title;
    entity.status = data.status;
    entity.startDate = new Date(data.startDate);
    entity.finishDate = new Date(data.finishDate);

    entity.competitors = data.competitors as Array<DuelUser>;
    entity.exercises = data.exercises as Array<DuelExercise>;

    return entity;
  }
}

interface DuelExercise {
  id: number;
  title: string;
  status: SubmissionStatus;
  submittedBy: string;
  score: number;
}


interface DuelUser {
  user: User
  exerciseScore: Record<number, number>
  totalScore: number
}
