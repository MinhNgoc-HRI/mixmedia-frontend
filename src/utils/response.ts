export type ResponseFormat<T> = {
  status: boolean;
  message: string;
  data: T;
};

export function formatResponse<T>(
  status = true,
  message = "success",
  data: T
): ResponseFormat<T> {
  return {
    status,
    message,
    data,
  };
}
