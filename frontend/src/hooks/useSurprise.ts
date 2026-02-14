import { useQuery } from '@tanstack/react-query';
import { getSurprise } from '../lib/api';

export const useSurprise = (code: string) => {
  return useQuery({
    queryKey: ['surprise', code],
    queryFn: () => getSurprise(code),
    enabled: !!code,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
