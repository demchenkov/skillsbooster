export declare type SortDirection = 'asc' | 'desc' | '';

export class Sort {
  public fieldName: string;
  public order: SortDirection;
  public pageNumber: number;

  constructor(fieldName: string, order: SortDirection, pageNumber: number) {
    this.fieldName = fieldName ?? null;
    this.order = order || '';
    this.pageNumber = pageNumber || 1;
  }

  static fromObject(data: any): Sort {
    if (data == null) {
      return null;
    }

    return new Sort(data.fieldName, data.order, data.pageNumber);
  }
}
