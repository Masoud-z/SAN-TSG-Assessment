import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import errorHandler from "./errorHandler";

let axiosInstance: AxiosInstance = axios.create();

export const api = <Result>(
  options?: AxiosRequestConfig,
  handleError = true
): Promise<AxiosResponse<Result>> => {
  return axiosInstance({ ...options })
    .then((response: AxiosResponse<Result>) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      errorHandler(error, handleError);
      return Promise.reject(error);
    }) as Promise<AxiosResponse<Result>>;
};

export default axiosInstance;
