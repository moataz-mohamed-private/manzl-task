export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
type OptionValue = string | number;

export type filterOption<T extends OptionValue> = {
  value: T;
  label: string;
};
