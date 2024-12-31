import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
const { CancelToken } = axios;
const source = CancelToken.source();

export const createRequest = (baseUrl: string, timeout: number) => {
  return (
    authToken?: string | undefined,
    cancelToken?: CancelTokenSource | undefined
  ) => {
    const headers: AxiosRequestConfig["headers"] = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": "",
    };
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    const defaultOptions: AxiosRequestConfig = {
      headers,
      baseURL: baseUrl,
      timeout,
      cancelToken: cancelToken ? cancelToken.token : source.token,
    };
    return {
      get: <T = any, R = AxiosResponse<T>>(
        url: string,
        options: AxiosRequestConfig = {}
      ) => {
        return axios.get<T, R>(url, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        });
      },

      post: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {}
      ) => {
        return axios.post<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        });
      },

      put: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {}
      ) =>
        axios.put<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),

      patch: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {}
      ) =>
        axios.patch<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),

      delete: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {}
      ) =>
        axios.delete<T, R>(url, {
          data: {
            ...data,
          },
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),
    };
  };
};
