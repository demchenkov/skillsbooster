export class ChallengeRequest {
  allianceId: number;
  challengeId: number;
  challengeTitle: string;


  static fromObject(data: any): ChallengeRequest {
    const entity = new ChallengeRequest();

    entity.allianceId = data.allianceId;
    entity.challengeId = data.challengeId;
    entity.challengeTitle = data.challengeTitle;

    return entity;
  }
}
