// Application configuration using environment variables

export const config = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',

  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'Blondes',
  defaultCurrency: import.meta.env.VITE_DEFAULT_CURRENCY || 'USD',
  deliveryFee: Number(import.meta.env.VITE_DELIVERY_FEE) || 5,
  discountPercent: Number(import.meta.env.VITE_DISCOUNT_PERCENT) || 10,
} as const;

// API Endpoints
export const endpoints = {
  // Products
  products: `${config.apiBaseUrl}/products`,

  // Authentication
  login: `${config.apiBaseUrl}/api/customers/login`,
  sendOtp: `${config.apiBaseUrl}/api/customers/sendotp`,
  verifyOtp: `${config.apiBaseUrl}/api/customers/verifyotp`,
  createCustomer: `${config.apiBaseUrl}/api/customers`,

  // Orders
  orders: `${config.apiBaseUrl}/api/orders`,
} as const;

// Local Storage Keys
export const storageKeys = {
  accessToken: 'accessToken',
  cart: 'cart-storage',
} as const;
