export class Alliance {
  id: number;
  title: string;
  // TODO: add model here

  public static fromObject(data: any): Alliance {
    const entity = new Alliance();

    entity.id = data.id;
    entity.title = data.title;

    return entity;
  }
}

export const Alliances = [
  Alliance.fromObject({id: 1, title: 'Title 1'}),
  Alliance.fromObject({id: 2, title: 'Title 2'}),
  Alliance.fromObject({id: 3, title: 'Title 3'}),
  Alliance.fromObject({id: 4, title: 'Title 4'}),
  Alliance.fromObject({id: 5, title: 'Title 5'}),
  Alliance.fromObject({id: 6, title: 'Title 6'}),
  Alliance.fromObject({id: 7, title: 'Title 7'}),
  Alliance.fromObject({id: 8, title: 'Title 8'}),
  Alliance.fromObject({id: 9, title: 'Title 9'}),
  Alliance.fromObject({id: 10, title: 'Title 10'}),
  Alliance.fromObject({id: 11, title: 'Title 11'}),
]