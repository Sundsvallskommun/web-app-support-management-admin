import { v4 } from 'uuid';
import { HttpException } from '@/exceptions/HttpException';
import { apiURL } from '@/utils/util';
import { logger } from '@utils/logger';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import ApiTokenService from './api-token.service';

class ApiResponse<T> {
  data: T;
  message: string;
}

class ApiService {
  private apiTokenService = new ApiTokenService();
  private async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const token = await this.apiTokenService.getToken();

    const defaultHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Request-Id': v4(),
    };

    const defaultParams = {};

    const preparedConfig: AxiosRequestConfig = {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
      params: { ...defaultParams, ...config.params },
      url: apiURL(config.url),
    };

    try {
      const res = await axios(preparedConfig);
      return { data: res.data, message: 'success' };
      
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error) && (error as AxiosError).response?.status === 404) {
        throw new HttpException(404, 'Not found');
      }
      // NOTE: did you subscribe to the API called?
      console.log(error);
      throw new HttpException(500, 'Internal server error from gateway');
    }
  }

  public async get<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    console.log('MAKING GET REQUEST TO URL', config.url);
    return this.request<T>({ ...config, method: 'GET' });
  }

  public async post<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    console.log('MAKING POST REQUEST TO URL', config.url);
    return this.request<T>({ ...config, method: 'POST' });
  }

  public async patch<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    console.log('MAKING PATCH REQUEST TO URL', config.url);
    return this.request<T>({ ...config, method: 'PATCH' });
  }

  public async delete<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    console.log('MAKING DELETE REQUEST TO URL', config.url);
    return this.request<T>({ ...config, method: 'DELETE' });
  }
}

export default ApiService;
