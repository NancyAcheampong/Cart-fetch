// API Service Layer
import { endpoints, storageKeys } from '../config';
import type {
  Product,
  LoginCredentials,
  SignupData,
  AuthResponse,
  CreateOrderPayload,
  Order,
  ApiResponse,
} from '../types';

// Custom API Error class
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem(storageKeys.accessToken);
};

// Set auth token to localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem(storageKeys.accessToken, token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem(storageKeys.accessToken);
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Base fetch wrapper with error handling
async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.message || data?.error || 'An error occurred',
      data
    );
  }

  return data as T;
}

// Product API
export const productApi = {
  getAll: async (): Promise<Product[]> => {
    return apiFetch<Product[]>(endpoints.products);
  },

  getById: async (id: string): Promise<Product> => {
    return apiFetch<Product>(`${endpoints.products}/${id}`);
  },
};

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiFetch<AuthResponse>(endpoints.login, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.accessToken) {
      setAuthToken(response.accessToken);
    }

    return response;
  },

  sendOtp: async (data: SignupData): Promise<ApiResponse<void>> => {
    return apiFetch<ApiResponse<void>>(endpoints.sendOtp, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  verifyOtp: async (data: {
    email: string;
    otp: string;
    username?: string;
    password?: string;
  }): Promise<ApiResponse<void>> => {
    return apiFetch<ApiResponse<void>>(endpoints.verifyOtp, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  createCustomer: async (data: { email: string; password: string }): Promise<ApiResponse<void>> => {
    return apiFetch<ApiResponse<void>>(endpoints.createCustomer, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  logout: (): void => {
    removeAuthToken();
  },
};

// Order API
export const orderApi = {
  create: async (order: CreateOrderPayload): Promise<Order> => {
    return apiFetch<Order>(endpoints.orders, {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },

  getAll: async (): Promise<Order[]> => {
    return apiFetch<Order[]>(endpoints.orders);
  },

  getById: async (id: string): Promise<Order> => {
    return apiFetch<Order>(`${endpoints.orders}/${id}`);
  },
};
