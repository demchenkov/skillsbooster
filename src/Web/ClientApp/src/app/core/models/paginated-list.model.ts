export class PaginatedList<T> {
  public items: Array<T>;

  public totalPages: number;
  public totalCount: number;
  public pageIndex: number;


  static fromObject<T>(data: any): PaginatedList<T> {
    if (data == null) {
      return null;
    }

    const list = new PaginatedList<T>();

    list.items = data.items;
    list.totalPages = data.totalPages;
    list.totalCount = data.totalCount;
    list.pageIndex = data.pageIndex;
    return list;
  }

  static getEmpty<T>() {
    return PaginatedList.fromObject<T>({
      items: [],
      totalPages: 0,
      totalCount: 0,
      pageIndex: 1
    });
  }
}
