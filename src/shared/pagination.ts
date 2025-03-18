export interface PaginatedResponse<T> {
  last_page: number;
  total_records: number;
  current_page: number;
  has_more_pages: boolean;
  data: T[];
}
