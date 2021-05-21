import { Difficulty } from "../enums";

export class Exercise {
  public id: number;
  public title: string;
  public markdownBody: string;
  public maxScore: number;
  public difficulty: Difficulty;

  // Author: User
  // AuthorId: number;

  static fromObject(data: any): Exercise {
    const exercise = new Exercise();

    exercise.id = data.id;
    exercise.title = data.title;
    exercise.markdownBody = data.markdownBody;
    exercise.maxScore = data.maxScore;
    exercise.difficulty = data.difficulty;

    return exercise;
  }
}
