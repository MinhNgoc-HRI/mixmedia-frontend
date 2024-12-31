export type ApiResponse<T> = {
  status: boolean;
  data?: T;
  error?: any;
};
