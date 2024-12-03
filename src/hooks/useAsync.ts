import { useState, useCallback } from 'react';

interface UseAsyncOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useAsync<T extends (...args: any[]) => Promise<any>>(
  asyncFunction: T,
  options: UseAsyncOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: Parameters<T>) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        options.onSuccess?.();
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        options.onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction, options]
  );

  return {
    execute,
    isLoading,
    error,
    reset: () => setError(null),
  };
}