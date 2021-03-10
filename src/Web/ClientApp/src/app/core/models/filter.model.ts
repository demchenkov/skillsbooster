import { Sort, SortDirection } from "./sort.model";

export class Filter extends Sort {
  public search: string;

  constructor(fieldName: string, search: string, pageNumber: number, order: SortDirection = 'asc') {
    super(fieldName, order, pageNumber);
    this.search = search;
  }

  static fromObject(data: any): Filter {
    if (data == null) {
      return null;
    }

    return new Filter(data.fieldName, data.search, data.pageNumber, data.order);
  }
}