/**
 * API Client - Axios wrapper with base configuration
 */

import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { config } from '../config';
import type { ApiError } from '../types/goinsight';

/**
 * Create axios instance with base configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 0, // Don't follow redirects
  validateStatus: (status) => status >= 200 && status < 400, // Accept redirects as success
});

/**
 * Request interceptor for logging or adding auth tokens
 */
apiClient.interceptors.request.use(
  (requestConfig: InternalAxiosRequestConfig) => {
    // Future: Add auth token here if needed
    // requestConfig.headers.Authorization = `Bearer ${token}`;
    return requestConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    let message = 'An unexpected error occurred';
    
    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.data?.error) {
      message = error.response.data.error;
    } else if (error.message === 'Network Error') {
      message = 'Unable to connect to the server. Please check your connection.';
    } else if (error.code === 'ECONNABORTED') {
      message = 'Request timed out. Please try again.';
    } else if (error.message) {
      message = error.message;
    }
    
    const apiError: ApiError = {
      message,
      status: error.response?.status,
    };
    return Promise.reject(apiError);
  }
);

export default apiClient;
