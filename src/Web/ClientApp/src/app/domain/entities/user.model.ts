import { Difficulty } from "../enums/difficulty.enum";
import { DuelResult } from "../enums/duel-result.enum";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;

  position: string;
  address: string;
  email: string;
  photoUrl: string;
  rank: number;

  allianceTitle: string;

  solvedTasks: Record<Difficulty, {total: number, solved: number}>;
  duelStats: Record<DuelResult, number>

  static fromObject(data: any): User {
    const entity = new User();

    entity.id = data.id;
    entity.firstName = data.firstName;
    entity.lastName = data.lastName;
    entity.fullName = data.fullName;
    entity.position = data.position;
    entity.address = data.address;
    entity.email = data.email;
    entity.photoUrl = data.photoUrl;
    entity.rank = data.rank;
    entity.allianceTitle = data.allianceTitle;
    entity.solvedTasks = data.solvedTasks;
    entity.duelStats = data.duelStats;

    return entity;
  }
}

export class UserLeaderBoard {
  id: number;
  username: string;
  solutions: number;
  rank: number;
  totalScore: number;


  public static fromObject(data: any): UserLeaderBoard {
    const entity = new UserLeaderBoard();

    entity.id = data.id;
    entity.username = data.username;
    entity.solutions = data.solutions;
    entity.rank = data.rank;
    entity.totalScore = data.totalScore;

    return entity;
  }
}
