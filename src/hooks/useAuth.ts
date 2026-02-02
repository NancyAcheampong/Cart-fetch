// Authentication hooks
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi, isAuthenticated, removeAuthToken } from '../services/api';
import type { LoginCredentials, SignupData } from '../types';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/products');
    },
  });

  const sendOtpMutation = useMutation({
    mutationFn: (data: SignupData) => authApi.sendOtp(data),
  });

  const verifyOtpMutation = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authApi.verifyOtp(email, otp),
  });

  const createCustomerMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authApi.createCustomer(data),
    onSuccess: () => {
      navigate('/login');
    },
  });

  const logout = () => {
    removeAuthToken();
    queryClient.clear();
    navigate('/login');
  };

  return {
    // State
    isAuthenticated: isAuthenticated(),

    // Login
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // Send OTP
    sendOtp: sendOtpMutation.mutate,
    sendOtpAsync: sendOtpMutation.mutateAsync,
    isSendingOtp: sendOtpMutation.isPending,
    sendOtpError: sendOtpMutation.error,

    // Verify OTP
    verifyOtp: verifyOtpMutation.mutate,
    verifyOtpAsync: verifyOtpMutation.mutateAsync,
    isVerifyingOtp: verifyOtpMutation.isPending,
    verifyOtpError: verifyOtpMutation.error,

    // Create Customer
    createCustomer: createCustomerMutation.mutate,
    createCustomerAsync: createCustomerMutation.mutateAsync,
    isCreatingCustomer: createCustomerMutation.isPending,
    createCustomerError: createCustomerMutation.error,

    // Logout
    logout,
  };
};
