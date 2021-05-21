export class JoinRequest {
  allianceId: number;
  userId: number;
  userFullName: string;

  static fromObject(data: any): JoinRequest {
    const entity = new JoinRequest();

    entity.allianceId = data.allianceId;
    entity.userId = data.userId;
    entity.userFullName = data.userFullName;

    return entity;
  }
}
