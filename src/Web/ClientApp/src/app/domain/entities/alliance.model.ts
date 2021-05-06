export class Alliance {
  id: number;
  title: string;
  description: string;
  leader: string;
  rating: number;
  creationDate: Date;
  // TODO: add model here

  public static fromObject(data: any): Alliance {
    const entity = new Alliance();

    entity.id = data.id;
    entity.title = data.title;
    entity.description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, iure. Ab, labore, enim praesentium laborum autem debitis ad sunt libero quos nihil hic! Sed provident illo, culpa repellendus ullam optio?';
    entity.leader = data.leader;
    entity.rating = data.rating;
    entity.creationDate = new Date();

    return entity;
  }
}

export const Alliances = [
  Alliance.fromObject({id: 1, title: 'Title 1', leader: 'Demchenko', rating: 1}),
  Alliance.fromObject({id: 2, title: 'Title 2', leader: 'Demchenko', rating: 2}),
  Alliance.fromObject({id: 3, title: 'Title 3', leader: 'Demchenko', rating: 3}),
  Alliance.fromObject({id: 4, title: 'Title 4', leader: 'Demchenko', rating: 4}),
  Alliance.fromObject({id: 5, title: 'Title 5', leader: 'Demchenko', rating: 5}),
  Alliance.fromObject({id: 6, title: 'Title 6', leader: 'Demchenko', rating: 6}),
  Alliance.fromObject({id: 7, title: 'Title 7', leader: 'Demchenko', rating: 7}),
  Alliance.fromObject({id: 8, title: 'Title 8', leader: 'Demchenko', rating: 8}),
  Alliance.fromObject({id: 9, title: 'Title 9', leader: 'Demchenko', rating: 9}),
  Alliance.fromObject({id: 10, title: 'Title 10', leader: 'Demchenko', rating: 10}),
]