// Order hooks
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../services/api';
import type { CreateOrderPayload, Order } from '../types';

export const useOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: orderApi.getAll,
  });
};

export const useOrder = (id: string) => {
  return useQuery<Order, Error>({
    queryKey: ['order', id],
    queryFn: () => orderApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: CreateOrderPayload) => orderApi.create(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      navigate('/products');
    },
  });
};
