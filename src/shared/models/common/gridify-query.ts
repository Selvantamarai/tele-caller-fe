export interface GridifyQuery {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  filter?: string;
}

export interface Paging<T> {
  count: number;
  data: T[];
}
