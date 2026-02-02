// Centralized type definitions for the application

// Product types
export type Product = {
  id: string;
  price: number;
  productSize: string;
  productColor: string;
  productName: string;
  image: string;
  inStock: boolean;
  isLiked: boolean;
};

// Cart types
export type CartItem = {
  product: Product;
  quantity: number;
};

// User types
export type User = {
  id: string;
  email: string;
  username?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupData = {
  username: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  user?: User;
  message?: string;
};

// Order types
export type OrderItem = {
  product_id: number;
  quantity: number;
  price: number;
};

export type PaymentMethod = 'cash' | 'vodafone_cash' | 'mtn_momo' | 'card';

export type CreateOrderPayload = {
  customer_id?: number;
  delivery_address: string;
  notes?: string;
  payment_method: PaymentMethod;
  items: OrderItem[];
};

export type Order = {
  id: string;
  customer_id: number;
  delivery_address: string;
  notes?: string;
  payment_method: PaymentMethod;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  created_at: string;
};

// API Response types
export type ApiResponse<T> = {
  data?: T;
  message?: string;
  error?: string;
};

// Cart Summary types
export type CartSummary = {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
};
