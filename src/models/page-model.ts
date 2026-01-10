export interface PageModel<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}
