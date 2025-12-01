import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Issuer } from '@/app/types/receipt';

export function useIssuers() {
  const [issuers, setIssuers] = useLocalStorage<Issuer[]>('issuers', []);

  const addIssuer = useCallback(
    (issuer: Omit<Issuer, 'id'>) => {
      const newIssuer: Issuer = {
        ...issuer,
        id: Date.now().toString(),
      };
      setIssuers((prev) => [...prev, newIssuer]);
      return newIssuer;
    },
    [setIssuers]
  );

  const updateIssuer = useCallback(
    (id: string, updatedIssuer: Partial<Omit<Issuer, 'id'>>) => {
      setIssuers((prev) =>
        prev.map((issuer) =>
          issuer.id === id ? { ...issuer, ...updatedIssuer } : issuer
        )
      );
    },
    [setIssuers]
  );

  const deleteIssuer = useCallback(
    (id: string) => {
      setIssuers((prev) => prev.filter((issuer) => issuer.id !== id));
    },
    [setIssuers]
  );

  const getIssuer = useCallback(
    (id: string) => {
      return issuers.find((issuer) => issuer.id === id);
    },
    [issuers]
  );

  return {
    issuers,
    addIssuer,
    updateIssuer,
    deleteIssuer,
    getIssuer,
  };
}
