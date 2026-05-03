import axios, { AxiosRequestConfig } from "axios";

export const axiosClient = axios.create({
  baseURL: "/api",
});

export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse<TErrors = unknown> {
  message: string;
  errors?: TErrors;
}

export const apiGet = async <TData>(
  url: string,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosClient.get<ApiSuccessResponse<TData>>(
    url,
    config,
  );

  return response.data.data;
};

export const apiPost = async <TData, TBody>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosClient.post<ApiSuccessResponse<TData>>(
    url,
    body,
    config,
  );

  return response.data.data;
};

export const apiDelete = async <TData, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosClient.delete<ApiSuccessResponse<TData>>(url, {
    ...config,
    data: body,
  });

  return response.data.data;
};

export const apiPatch = async <TData, TBody>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosClient.patch<ApiSuccessResponse<TData>>(
    url,
    body,
    config,
  );

  return response.data.data;
};
