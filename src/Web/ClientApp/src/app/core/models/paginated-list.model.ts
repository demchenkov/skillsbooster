export class PaginatedList<T> {
  public items: Array<T>;

  public totalPages: number;
  public totalCount: number;
  public pageIndex: number;

  public hasNextPage: boolean;
  public hasPrevPage: boolean;

  static fromObject<T>(data: any, itemsAdapter: (entity: any) => T = PaginatedList.defaultAdapter): PaginatedList<T> {
    if (data == null) {
      return null;
    }

    const list = new PaginatedList<T>();

    list.items = data.items != null && Array.isArray(data.items) 
      ? data.items.map(item => itemsAdapter(item))
      : [];

    list.totalPages = data.totalPages;
    list.totalCount = data.totalCount;
    list.pageIndex = data.pageIndex;
    list.hasNextPage = data.hasNextPage;
    list.hasPrevPage = data.hasPrevPage;
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

  private static defaultAdapter<T>(entity: any): T {
    return entity as T
  }
}
