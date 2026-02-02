// Product hooks
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../services/api';
import type { Product } from '../types';

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: productApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
