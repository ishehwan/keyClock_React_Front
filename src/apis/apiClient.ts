import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  preferred_username: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  realm_access?: {
    roles: string[];
  };
  role?: string; 
  exp?: number;
}

// 토큰 관련 유틸리티 함수들
const getToken = (): string | null => {
  return sessionStorage.getItem('token');
};

const removeToken = (): void => {
  sessionStorage.removeItem('token');
};

const redirectToLogin = (): void => {
  window.location.href = '/login';
};

// 토큰에서 역할 추출
const getRoleFromToken = (): string => {
  const token = getToken();
  if (!token) {
    return 'default'; // 기본값
  }
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role || 'default';
  } catch (error) {
    console.error('Token decode error:', error);
    return 'default';
  }
};

// API 클라이언트 생성
const createApiClient = (): AxiosInstance => {
  const role = getRoleFromToken();
  
  const apiClient = axios.create({
    baseURL: '/api/' + role, // Vite proxy 설정에 맞춤
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request Interceptor - 토큰 자동 첨부
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor - 에러 핸들링
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      // 401 Unauthorized 에러 처리
      if (error.response?.status === 401) {
        console.warn('토큰이 만료되었거나 유효하지 않습니다.');
        removeToken();
        redirectToLogin();
      }
      
      // 403 Forbidden 에러 처리
      if (error.response?.status === 403) {
        console.warn('접근 권한이 없습니다.');
        removeToken();
        redirectToLogin();
      }
      
      return Promise.reject(error);
    }
  );

  return apiClient;
};

// 동적으로 API 클라이언트 생성하는 함수
let apiClientInstance: AxiosInstance | null = null;

const getApiClient = (): AxiosInstance => {
  if (!apiClientInstance) {
    apiClientInstance = createApiClient();
  }
  return apiClientInstance;
};

// API 메서드들
export const api = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) => 
    getApiClient().get<T>(url, config),
  
  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => 
    getApiClient().post<T>(url, data, config),
  
  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => 
    getApiClient().put<T>(url, data, config),
  
  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) => 
    getApiClient().delete<T>(url, config),
  
  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => 
    getApiClient().patch<T>(url, data, config),
};

// API 클라이언트 새로고침 (토큰 변경 시 사용)
export const refreshApiClient = (): void => {
  apiClientInstance = null;
};

export default getApiClient(); 