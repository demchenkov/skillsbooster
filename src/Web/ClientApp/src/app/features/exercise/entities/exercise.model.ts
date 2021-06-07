import { Difficulty } from "./difficulty.enum";

export class Exercise {
  public id: number;
  public title: string;
  public markdownBody: string;
  public maxScore: number;
  public difficulty: Difficulty;
  public topic: string;

  // Author: User
  // AuthorId: number;

  static fromJS(data: any): Exercise {
    const exercise = new Exercise();

    exercise.id = data.id;
    exercise.title = data.title;
    exercise.markdownBody = data.markdownBody;
    exercise.maxScore = data.maxScore;
    exercise.difficulty = data.difficulty;
    exercise.topic = data.topic;

    return exercise;
  }
}
