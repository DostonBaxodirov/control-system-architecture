import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class Http {
  private static instance: Http;

  private accessToken: string | null;

  private api: AxiosInstance;

  private constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL
    });

    this.api.interceptors.request.use(
      // @ts-ignore
      (config: AxiosRequestConfig) => {
        if (this.accessToken) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${this.accessToken}`
          };
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          console.log('Token expired or missed');
          this.handleTokenExpiration();
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): Http {
    if (!Http.instance) {
      Http.instance = new Http();
    }
    return Http.instance;
  }

  private handleTokenExpiration(): void {
    window.location.href = '/auth';
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, config);
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data, config);
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, config);
  }
}

export const http = Http.getInstance();
